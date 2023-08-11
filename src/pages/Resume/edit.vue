<template lang="pug">
.row.g-0.row-cols-2
  .col
    .mx-5
      div.my-2
        .badge(:class="`bg-${scoreColor}`" ) {{ score }}%
        span.ms-2.text-muted Resume score
        .progress(:style="{height: `3px`}" ).mt-1
          .progress-bar(:style="{width: `${score}%`}" :class="`bg-${scoreColor}`"  :aria-valuenow="score" aria-valuemin="0" aria-valuemax="100")
      personal-details(v-model="formPersonal")
      button(@click="update").btn.btn-primary.mt-5 Update
      pre {{ form }}
  .col
    pdf-preview(:data="form")
</template>

<script setup lang="ts">
import api from "../../api";
import { useRoute } from "vue-router";
import PdfPreview from "./components/PdfPreview.vue";
import {computed, nextTick, onMounted, ref} from "vue";
import moment from "moment";
import PersonalDetails from "./components/Form/PersonalDetails.vue";

const route: any = useRoute();
const formPersonal = ref();
const score = ref(25);
const scoreColor = computed(() => {
  let color = "danger";

  if (score.value > 50) color = "warning";
  if (score.value > 85) color = "success";

  return color;
} );
const form = ref({});

onMounted(async () => {
 const data = await api.resume().show(+route.params.id);
  formPersonal.value = {
    job_title: data?.job_title,
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    phone: data?.phone,
    city: data?.city,
    country: data?.country,
    about_me: data?.about_me,
  }
  update()
});

const update = async () => {
  form.value =  await api.resume().patch(+route.params.id, {...formPersonal.value});
};
</script>

<style scoped lang="scss"></style>
