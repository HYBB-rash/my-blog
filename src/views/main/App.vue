<script setup lang="ts">
import { getArticles } from "./App.ts";

const articles = getArticles();
</script>

<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            <div>{{ article.id }}</div>
            <div>{{ article.title }}</div>
            <div>{{ article.date }}</div>
            <div>{{ article.path }}</div>
        </div>
    </div>
</template>

<style scoped></style>
