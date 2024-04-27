<script setup lang="ts">
import { getArticles } from "./App.ts";

const articles = getArticles();
</script>

<template>
    <div>
        <div v-for="article in articles">
            <h2>{{ article.id }}</h2>
            <h2>{{ article.title }}</h2>
            <h2>{{ article.date }}</h2>
            <h2>{{ article.path }}</h2>
        </div>
    </div>
</template>

<style scoped></style>
