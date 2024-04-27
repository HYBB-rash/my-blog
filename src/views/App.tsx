import { defineComponent } from "vue";
import { getArticles } from "./App.ts";

export const ArticlesList = defineComponent({
    setup() {
        const articles = getArticles();
        return () =>
            articles.value.map((article) => (
                <div>
                    <div>{article.id}</div>
                    <div>{article.title}</div>
                    <div>{article.date}</div>
                    <div>{article.path}</div>
                </div>
            ));
    },
});
