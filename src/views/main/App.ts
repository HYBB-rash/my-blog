import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";

type Article = {
    id: number;
    title: string;
    timestamp: number;
    path: string;
    md5: string;
    md5_suffix: string;
};

export function getArticles() {
    const raw = ref<Article[]>([]);

    onMounted(async () => {
        const response = await fetch("articles.json");
        raw.value = await response.json();
    });

    return computed(() => {
        return raw.value
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((article) => ({
                ...article,
                date: dayjs(article.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss"),
            }));
    });
}
