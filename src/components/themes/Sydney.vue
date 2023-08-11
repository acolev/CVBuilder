<template lang="pug">
.sydney(v-bind="$attrs").d-none2
  b-overlay(:show="loading" :style="{height: '100%'}" variant="light" blur="1rem")
    vue-pdf(:src="pdfSrc" :page="page" v-if="pdfSrc" :key="pdfKey")
.d-none
  .sydney-content(ref="refContent")
    div(v-if="data" )
      b-row.align-items-center.mb-5
        b-col(cols="auto")
          b-avatar(src="https://s3.resume.io/uploads/profile_picture/file/11794412/thumb_076e14088cd55b725a3e6949c9344052.jpg?version=5bfa1ebc4" size="lg" )
        b-col
          .fullname {{ full_name }}
          .job_title {{ getData('job_title') }}
      b-card(no-body).border-0.mb-3
        .title About Me
        div.mb-2.page-break(v-html="getData('about_me')")
      b-card(no-body).border-0.mb-3
        .title Employment History
        div(v-for="n in 2").mb-2.page-break
          .work-title Full-stack Developer, jCube Group, Chisinau
          .work-date January 2023 - Present
          .work-responsibilities
          ul
            li Creating an interface for managing the store, where I used keep-alive to create tabs and quickly return to the page, with the ability to pin or close the tab, there was also a function to automatically pin the tab if the form was changed in order not to lose data, after saving it was detached if it was not fixed specifically.
            li I used vuex to remember various settings, such as which fields to show in tables (Product name, prices, stock...).
      b-card(no-body).border-0.mb-3
        .title Education
        div(v-for="n in 5").mb-2.page-break
          .work-title Full-stack Developer, jCube Group, Chisinau
          .work-date January 2023 - Present
          .work-responsibilities
          ul
            li Creating an interface for managing the store, where I used keep-alive to create tabs and quickly return to the page, with the ability to pin or close the tab, there was also a function to automatically pin the tab if the form was changed in order not to lose data, after saving it was detached if it was not fixed specifically.
            li I used vuex to remember various settings, such as which fields to show in tables (Product name, prices, stock...).
  .sydney-aside(ref="refAside" :class="asideClass")
    div(v-for="n in 1")
      .title Details
      div.text
        ul.d-block
          li {{ getData('city') }}
          li {{ getData('country') }}
          li {{ getData('phone') }}
          li {{ getData('email') }}
      .title.mt-3 Links
      div.text
        div https://jcubegroup.com/
      div(:style="{height: '50px'}")
      .title Skills
      div.text
        div(v-for="(skill, idx) in ['SQL', 'PHP', 'JS']" ).mb-3 {{ skill }}
          div.progress.mt-1
            div.progress-value(:style="{width: `${(idx + 2) * 25}%`}")
      .title.mt-3 Languages
      div.text
        div(v-for="(lang, idx) in ['English', 'Romanian', 'Russian']" ).mb-3 {{ lang }} (b{{idx+1}})
          div.progress.mt-1
            div.progress-value(:style="{width: `${(idx + 2) * 25}%`}")
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";
import type { Ref } from "vue";
import { VuePdf } from "vue3-pdfjs";
import { jsPDF } from "jspdf";
import { hexToRgb, lightOrDark } from "@/helpers/color";
import hash from "object-hash";

import fontImpact from "@/assets/fonts/impact.ttf";
import fontOrbitron from "@/assets/fonts/Orbitron.ttf";
import fontOrbitronBold from "@/assets/fonts/Orbitron-Bold.ttf";
import fontTimes from "@/assets/fonts/times.ttf";
import fontArial from "@/assets/fonts/arial/arial.ttf";
import fontArialNarrow from "@/assets/fonts/arial/arialn.ttf";
import fontArialNarrowBold from "@/assets/fonts/arial/arialnb.ttf";
import fontArialBold from "@/assets/fonts/arial/ariblk.ttf";

const opt: Ref<any> = ref({
  unit: "px",
  format: "a4",
  orientation: "p",
  compress: false,
  hotfixes: ["px_scaling"],
});
const doc = new jsPDF(opt.value);
doc.addFont(fontImpact, "Impact", "normal", "normal");
doc.addFont(fontOrbitron, "Orbitron", "normal", "normal");
doc.addFont(fontOrbitronBold, "Orbitron", "normal", 900);
doc.addFont(fontTimes, "Times new Roman", "normal", "normal");
doc.addFont(fontTimes, "Times new Roman", "normal", "bold");
doc.addFont(fontArial, "Arial", "normal");
doc.addFont(fontArialBold, "Arial Black", "normal");
doc.addFont(fontArialNarrow, "Arial Narrow", "normal");

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  page: {
    type: Number,
    default: () => 1,
  },
});
const { page, data } = toRefs(props);

const full_name = computed(() =>
  [data?.value.first_name, data?.value.last_name].join(" ")
);

const pdfKey = ref("pdf");
const pdfSrc: any = ref(null);
const loading: any = ref(false);

const refContent: Ref<any> = ref(null);
const refAside: Ref<any> = ref(null);

const ThemeOptions: Ref<any> = ref({
  backgroundColor: "#fff",
  asideBackgroundColor: "#082a4d",
});
const asideClass = computed(() => lightOrDark(ThemeOptions.value.asideBackgroundColor) || 'dark');


const defOptions: Ref<any> = ref({
  autoPaging: "text",
  html2canvas: {
    scale: 1,
    letterRendering: 1,
    quality: 1,
  },
});
const width = doc.internal.pageSize.getWidth();
const height = doc.internal.pageSize.getHeight();
const margins = [70, 50];
const contentWidth = (width / 100) * 80;
const asideWidth = (width / 100) * 20 + margins[1] * 2;
const asideX = width - asideWidth;

const emit = defineEmits(["update:document", "update:state"]);
const update = async () => {
  loading.value = true;

  await doc.html(refContent.value, {
    ...defOptions.value,
    margin: margins,
    x: 0,
    y: 0,
    width: contentWidth,
    windowWidth: contentWidth - margins[1] * 4,
  });

  const asideColor = hexToRgb(ThemeOptions.value.asideBackgroundColor);
  console.log(asideColor)
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i);
    //@ts-ignore
    doc.setFillColor(...asideColor);
    doc.rect(asideX, 0, asideWidth, height, "F");
  }

  await doc.html(refAside.value, {
    ...defOptions.value,
    html2canvas: {
      ...defOptions.value.html2canvas,
      backgroundColor: ThemeOptions.value.asideBackgroundColor,
    },
    margin: [margins[0], 0],
    x: asideX,
    y: 0,
    width: asideWidth,
    windowWidth: asideWidth,
  });

  pdfKey.value = hash({ date: new Date(), page: page.value, ...data.value })
    .toString()
    .substring(0, 8);
  pdfSrc.value = doc.output("bloburl");
  loading.value = false;

  emit("update:document", doc);
  emit("update:state", loading.value);
};

const getData = (field: string) => data.value[field] || "";

onMounted(() => {
  ThemeOptions.value.asideBackgroundColor = data?.value.themeColor || "#082a4d";
  update();
});
watch(() => page?.value, update);
watch(() => data?.value, update);
</script>

<style scoped lang="scss">
.sydney {
  aspect-ratio: 3 / 4.22;
  overflow: hidden;
  border-radius: 6px;

  &-content {
    color: #000;
    font-size: 12px;
    font-family: "Times new Roman", sans-serif;
    letter-spacing: 0.1px;

    .title {
      //color: #555;
    }
    .fullname {
      font-family: "Arial", sans-serif;
      letter-spacing: 1px;
      font-size: 24px;
      font-weight: bold;
    }
    .job_title {
      font-family: "Orbitron", sans-serif;
      letter-spacing: 3px;
      font-size: 10px;
      color: #555;
      text-transform: uppercase;
    }
    .work {
      &-title {
        font-size: 18px;
        font-family: "Arial Narrow", sans-serif;
        letter-spacing: 0.1px;
      }
      &-date {
        color: #b7b7b7;
        font-size: 11px;
        font-weight: 400;
        text-transform: uppercase;
        margin: 3px 0;
      }
      &-responsibilities {
        font-size: 12px;
        > ul {
          padding-left: 15px;
        }
      }
    }
    ul {
      padding-left: 15px;
      li {
        position: relative;
        list-style: none;
        margin-bottom: 5px;
        &:before {
          display: block;
          width: 5px;
          height: 5px;
          content: "";
          background: currentColor;
          border-radius: 50px;
          position: absolute;
          top: 10px;
          left: -15px;
        }
      }
    }

    .card:last-child {
      margin-bottom: 0 !important;
    }
  }
  &-aside {
    font-size: 10px;
    padding: 0 30px;

    .text {
      font-family: "Times new Roman", sans-serif;
      font-size: 14px;
      letter-spacing: 0.1px;
    }

    &.dark{
      color: lightgrey;
      .title {
        color: white;
      }
      .progress {
        background: #777;
        border-radius: 3px;
        overflow: hidden;
        height: 6px;
        &-value {
          background: #fff;
          height: inherit;
        }
      }
    }
    &.light{
      .title {
        color: #082a4d;
      }
      .progress {
        background: #777;
        border-radius: 3px;
        overflow: hidden;
        height: 6px;
        &-value {
          background: #082a4d;
          height: inherit;
        }
      }
    }


    ul {
      &.d-block {
        padding: 0;
        li {
          display: block;
        }
      }
    }
  }
  &-aside,
  &-content {
    .title {
      position: relative;
      font-family: "Arial Narrow", sans-serif;
      font-size: 18px;
      margin-bottom: 10px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
</style>
