<script setup lang="ts">
import { onMounted, ref } from "vue";

type Article = {
    id: number;
    title: string;
    timestamp: number;
    path: string;
};

const articles = ref<Article[]>([]);

onMounted(async () => {
    const response = await fetch("articles.json");
    articles.value = await response.json();
});
</script>

<template>
    <div>
        <div v-for="article in articles">
            <h2>{{ article.id }}</h2>
            <h2>{{ article.title }}</h2>
            <h2>{{ article.timestamp }}</h2>
            <h2>{{ article.path }}</h2>
        </div>
    </div>
</template>

<style scoped></style>
