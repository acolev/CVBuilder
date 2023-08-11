<template lang="pug">
ul.nav.nav-tabs
    li.nav-item
      router-link(:to="{name: 'Resumes'}" active-class="active" ).nav-link Resumes
    li.nav-item
      a.nav-link.disabled Cover Letters
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
