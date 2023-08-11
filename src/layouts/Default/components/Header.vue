<template lang="pug">
header
  b-navbar(toggleable="lg" fixed="top").bg-light
    b-navbar-brand {{ appName }}
    b-navbar-toggle(target="menu" )
    b-collapse#menu(is-nav)
      .flex-grow-1
      b-navbar-nav(align="right" )
        b-nav-item(:to="{name: 'Home'}") Home
        .border.mx-2
        b-nav-item(@click="themeStore.change()") {{ themeStore.theme }}
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const appName = __ENV__?.VITE_APP_NAME || "My App"

</script>
