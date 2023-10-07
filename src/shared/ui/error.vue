<script setup lang="ts">
interface Props {
  text: string;
}

const props = defineProps<Props>();
</script>

<template>
  <p class="error__text">Произошла ошибка: {{ props.text }}</p>
</template>

<style scoped>
.error__text {
  margin: 0;
  font-size: 12px;
  color: #ff4d4f;
}
</style>
