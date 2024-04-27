import { onMounted, ref } from "vue";

type Article = {
    id: number;
    title: string;
    timestamp: number;
    path: string;
    md5: string;
    md5_suffix: string;
};

export function getArticleContent() {
    const raw = ref("");

    onMounted(async () => {
        // const queryString = window.location.search; // 获取当前 URL 的查询字符串部分
        const path = new URL(window.location.href).pathname.split("/");
        const last_path = path.pop();

        if (last_path === undefined) {
            throw new Error("path is required");
        }

        let id: string | undefined = last_path === "" ? path.pop() : last_path;

        if (id === undefined) {
            throw new Error("id is required");
        }

        const response = await fetch("../../../articles.json");
        const articles = await response.json();

        const article = articles.find((article: Article) => article.md5_suffix === id);
        if (!article) {
            throw new Error("article not found");
        }

        if (!article.path) {
            throw new Error("path is required");
        }
        raw.value = await (await fetch(`/${article.path}`)).text();
    });

    return raw;
}
