<template lang="pug">
div
  router-view
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

const $route = useRoute()

const showHeader = computed(() => $route.meta?.header)
</script>

<style scoped lang="scss">
.layout-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  progress {
    width: 100%;
  }
}
</style>
