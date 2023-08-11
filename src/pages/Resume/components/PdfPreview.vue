<template lang="pug">
.pdf-preview-container
  .fit-content
    b-row.mb-4.text-light.align-items-center
      b-col(cols="2").state-text
        div(v-if="!state").d-flex
          svg-icon(type="mdi" :path="mdiCloudCheck" :size="18").me-2
          | Saved
        div(v-else).d-flex
          .me-2
            b-spinner(small)
          | Saving...
      b-col
        .d-flex.gap-2.justify-content-center.align-items-center
          b-button(@click="page--" :disabled="page <= 1" size="sm" )
           svg-icon(type="mdi" :path="mdiChevronLeft")
          div {{ page }} / {{ numOfPages }}
          b-button(@click="page++" :disabled="page >= numOfPages" size="sm")
            svg-icon(type="mdi" :path="mdiChevronRight")
      b-col(cols="2")
    div(style="width: 40vw;")
      component(
        :is="template"
        :data="data"
        :page="page"
        @update:document="doc = $event"
        @update:state="state = $event"
        )
    div.mt-3
      b-row
        b-col
          b-button(pill)
            svg-icon(type="mdi" :path="mdiViewGridOutline" :size="20").me-2
            | Select template
        b-col(cols="auto")
          b-button(variant="dark" @click="preview").me-2 Preview
          b-button(variant="primary" @click="download") Download
</template>

<script setup lang="ts">
import {ref, defineAsyncComponent, computed} from "vue";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiCloudCheck,
  mdiViewGridOutline,
} from "@mdi/js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const selectedTheme = ref("Sydney");
const template = defineAsyncComponent(
    () =>  /* @vite-ignore */ import(`/src/components/themes/${selectedTheme.value}.vue`)
);

const state = ref(true);
const doc = ref(null);
const numOfPages = computed(() => doc.value?.getNumberOfPages() || 1);
const page = ref(1);
const download = () => {
  doc.value.save();
};
const preview = () => {
  window.open(doc.value.output('bloburl'));
};
</script>

<style scoped lang="scss">
.state {
  &-text {
    font-size: 12px;
    font-weight: 100;
    font-family: "Tahoma", sans-serif;
    letter-spacing: 1px;
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.fit-content {
  width: fit-content;
}
.pdf-preview-container {
  display: flex;
  justify-content: center;
  overflow: auto;
  background: var(--bs-gray);
  height: 100vh;
  padding: 30px;
}
</style>
