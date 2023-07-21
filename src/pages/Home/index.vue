<template lang="pug">
div Hello World
pre {{ users }}
</template>

<script setup lang="ts">
import api from "@/api";
import { onMounted, ref } from "vue";

const users = ref();

onMounted(async () => {
  users.value = await api.users().get();
})
</script>

<style scoped lang="scss"></style>
