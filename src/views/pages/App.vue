<script setup lang="ts">
import { getArticleContent } from "./App.ts";
import markdownit from "markdown-it";

const md = markdownit();

const content = getArticleContent();
</script>

<template>
    <div v-html="md.render(content)"></div>
</template>

<style lang="postcss" scoped></style>
