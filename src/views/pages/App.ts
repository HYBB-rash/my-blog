import { onMounted, ref } from "vue";

export function getArticleContent() {
    const raw = ref("");

    onMounted(async () => {
        const queryString = window.location.search; // 获取当前 URL 的查询字符串部分
        const urlParams = new URLSearchParams(queryString);
        const path = urlParams.get("path");

        if (!path) {
            throw new Error("path is required");
        }
        raw.value = await (await fetch(path)).text();
    });

    return raw;
}
