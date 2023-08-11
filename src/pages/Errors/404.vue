<template lang="pug">
.d-grid.error-page
  div.content.text-center
    h1.mt-3.fw-bold
      .fs-1 Oops! Looks like something went wrong.
    p.mt-3 We're sorry, but it seems that the page you were trying to access is lost in the digital wilderness. Our team of skilled explorers is on the case, trying to track it down and bring it back safe and sound.
    div
      b-button(size="lg" variant="primary" @click="goBack").px-5.py-3.mt-5 Bo back
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const goBack = () => router.go(-1);
</script>


<style scoped lang="scss">
.error-page {
  height: 100vh;
  padding: 100px 0 0;
  background: var(--bs-primary-bg-subtle);
  grid-template-columns: 2fr 5fr 2fr;
  grid-template-areas: ". content .";
  align-items: center;

  .content {
    grid-area: content;
  }
}
</style>
