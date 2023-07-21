<template lang="pug">
component(:is="layout")
</template>

<script setup lang="ts">
import AppLayoutDefault from "./layouts/Loading/index.vue";
import {markRaw, shallowRef, watch} from "vue";
import { useRoute } from "vue-router";

const layout = shallowRef(AppLayoutDefault);
const route = useRoute();

setTimeout(() => {
  watch(
    () => route?.meta?.layout as string | undefined,
    async (metaLayout) => {
      try {
        const component =
          metaLayout &&
          (await import(
            /* @vite-ignore */ `@/layouts/${metaLayout}/index.vue`
            ));
        layout.value = markRaw(component?.default || AppLayoutDefault);
      } catch (e) {
        layout.value = markRaw(AppLayoutDefault);
      }
    },
    { immediate: true }
  );
}, 1000);
</script>

<style scoped lang="scss"></style>


