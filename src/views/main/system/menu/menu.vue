<template>
  <div class="menu">
    <pageContent :content-config="contentConfig"> </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from '@/views/main/system/menu/configs/content.config'
</script>

<style scoped>
.menu {
}
</style>
