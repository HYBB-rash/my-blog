import * as fs from "node:fs";
import { fileURLToPath } from "url";
import { getFileList } from "./shared";
import { dirname, resolve } from "path";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateMD5(input: string) {
    const hash = crypto.createHash("md5");
    hash.update(input);
    return hash.digest("hex");
}

function tmpl_html(suffix: string) {
    const pages_dir = `pages/${suffix}`;
    return `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文章...</title>
</head>
<body>
<div id="app"></div>
<script type="module" src="/views/${pages_dir}/main.ts"></script>
</body>
</html>
`;
}

function tmpl_ts() {
    return `
import { createApp } from "vue";
import "../../../src/assets/global.css";
import App from "../../../src/views/pages/App.vue";

createApp(App).mount("#app");
`;
}

fs.rmSync(resolve(__dirname, "../views/pages"), { recursive: true });

getFileList(resolve(__dirname, "../public/files/articles"), /\.md$/).forEach((file: string) => {
    console.log(`Processing ${file}`);

    const file_content = fs.readFileSync(file, "utf-8");
    const suffix = generateMD5(file_content).slice(0, 8);

    fs.mkdirSync(resolve(__dirname, `../views/pages/${suffix}`), { recursive: true });
    fs.writeFileSync(resolve(__dirname, `../views/pages/${suffix}/index.html`), tmpl_html(suffix));
    fs.writeFileSync(resolve(__dirname, `../views/pages/${suffix}/main.ts`), tmpl_ts());
});

type Article = {
    id: number;
    title: string;
    timestamp: number;
    path: string;
};

const content = fs.readFileSync(resolve(__dirname, "../public/articles.json"), "utf-8");

const articles: Article[] = JSON.parse(content);

const articles_with_md5 = articles.map((article) => {
    const { path } = article;
    const actual_path = resolve(__dirname, "../public", path);
    const file_content = fs.readFileSync(actual_path, "utf-8");
    const md5 = generateMD5(file_content);
    const md5_suffix = md5.slice(0, 8);

    console.log(`Compute md5: ${actual_path} => ${md5_suffix}`);

    return { ...article, md5, md5_suffix };
});

fs.writeFileSync(resolve(__dirname, "../public/articles.json"), JSON.stringify(articles_with_md5, null, 4));
