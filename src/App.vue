<template lang="pug">
component(:is="layout")
</template>

<script setup lang="ts">
import AppLayoutDefault from "./layouts/Loading/index.vue";
import {computed, markRaw, shallowRef, watch} from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "./stores/theme";
import { useHead } from "@vueuse/head";

const layout = shallowRef(AppLayoutDefault);
const route = useRoute();
const themeStore = useThemeStore();


const changeTheme = () => {
  document
    .querySelector("html")
    .setAttribute("data-bs-theme", themeStore.theme);
};
changeTheme();

watch(
  () => themeStore.theme,
  () => changeTheme()
);

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
        console.log(e);
      }
    },
    { immediate: true }
  );
}, 1000);

useHead({
  // Can be static or computed
  title: computed(() => [route?.meta?.title, __ENV__?.VITE_APP_NAME].filter((e: string) => !!e ).join(' | ')),
  meta: [
    {
      name: `description`,
      content: computed(() =>  route?.meta?.description),
    },
  ],
})
</script>

<style scoped lang="scss"></style>
