<template lang="pug">
div
  h3 Personal Details
.row.gx-3.row-cols-2
  .col(v-for="field in fields" )
    b-form-group(:label="field.title" :label-for="field.id" v-if="field.type === 'string'" )
      b-form-input(:id="field.id" v-model="field.value" :type="field.inputType || 'text'")
    div(v-else-if="field.type === 'image'" )
      p image
label.form-label(for="ProfessionalSummary") Professional Summary
textarea(v-model="fields[8].value").form-control
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object,
  },
});

const fields: Ref = ref([
  {
    id: "job_title",
    title: "Wanted Job Title",
    value: "",
    type: "string",
  },
  {
    id: "photo",
    title: "Wanted Job Title",
    value: "",
    type: "image",
  },
  {
    id: "first_name",
    title: "First Name",
    value: "",
    type: "string",
  },
  {
    id: "last_name",
    title: "Last Name",
    value: "",
    type: "string",
  },
  {
    id: "email",
    title: "Email",
    value: "",
    type: "string",
    inputType: "email",
  },
  {
    id: "phone",
    title: "Phone",
    value: "",
    type: "string",
    inputType: "tel",
  },
  {
    id: "country",
    title: "Country",
    value: "",
    type: "string",
  },
  {
    id: "city",
    title: "City",
    value: "",
    type: "string",
  },
  {
    id: "about_me",
    title: "Summary",
    value: "",
    type: "hidden",
  },
]);

watch(
  () => props.modelValue,
  (val: any) => {
    fields.value.map((el: any) => {
      el.value = val[el.id] || "";
    });
  }
);
watch(
  () => fields.value,
  (val) => {
    const values: any = {};
    fields.value.forEach((el: any) => {
      values[el.id] = el.value;
    });
    emit("update:modelValue", values);
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss"></style>
