<script setup lang="ts">
import { getArticles } from "./App.ts";

const articles = getArticles();
</script>

<template>
    <div class="flex justify-center items-center">
        <ul class="w-3/4">
            <li class="my-8" v-for="article in articles" :key="article.id">
                <a class="flex-row" :href="'/views/pages/?path=' + article.path">
                    <span class="font-bold text-6xl mx-4">{{ article.title }}</span>
                    <span>发表日期: {{ article.date }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
