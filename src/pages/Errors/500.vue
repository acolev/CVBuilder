<template lang="pug">
  div 500
    button(@click="goBack") GO BACK
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.go(-1);
</script>

