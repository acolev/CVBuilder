<template lang="pug">
.mt-5.pt-5
  .container
    h1.mb-5 Resumes & Cover Letters
    builders-tabs
    .row.row-cols-4(v-if="rcount")
      .col.p-4(v-for="(resume, idx) in resumes" :key="idx")
        component(:is="Sydney" :data="resume" :page="1" class="shadow")
        div.mt-3
          h6 {{ resume.title }}
          router-link(:to="{name: 'EditResume', params: {id: resume.id}}") Edit
    div(v-else).text-center.py-5
      no-resume
      h3 Your shining professional image
      p Custom-built, amazing resumes. Empower your job search in just a few clicks!
      div.mt-3
        button.btn.btn-sm.btn-primary(@click="createCV" variant="primary" ) + New resume
</template>

<script setup lang="ts">
import api from "@/api";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import Sydney from "@/components/themes/Sydney.vue";
import noResume from '@/components/noResume.vue'
import BuildersTabs from "@/components/BuildersTabs.vue";

const router: any = useRouter();

const resumes = ref();
const rcount = computed(() => resumes.value?.length);

const updateResumes = async () => {
  const data = await api.resume().get();
  resumes.value = data;
};
onMounted(updateResumes);

const createCV = async () => {
  const id: number = await api.resume().post({
    title: "Untitled",
    created_at: moment().unix(),
    score: 0,
  });
  router.replace({ name: "EditResume", params: { id } });
};

const scoreColor = (score: number): string => {
  let color = "danger";

  if (score > 50) {
    color = "warning";
  }
  if (score > 85) {
    color = "success";
  }

  return color;
};
</script>

<style scoped lang="scss"></style>
