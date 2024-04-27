import fs from "node:fs";

export function getFileList(dir: string, regex: RegExp | null): string[] {
    let res: string[] = [];
    return fs.readdirSync(dir, { withFileTypes: true }).reduce((list, file) => {
        return list.concat(
            file.isDirectory()
                ? getFileList(`${dir}/${file.name}`, regex)
                : regex == null || file.name.match(regex)
                  ? [`${dir}/${file.name}`]
                  : [],
        );
    }, res);
}
