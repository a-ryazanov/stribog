<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface Props {
  updatedAt: Date | null;
}

const props = defineProps<Props>();
const isUpdatedAtLeastOnce = computed(() => props.updatedAt !== null);
const date = computed(() => {
  const hours = props.updatedAt?.getHours();
  const minutes = props.updatedAt?.getMinutes();

  return `${hours}:${minutes}`;
});
</script>

<template>
  <h2>{{ isUpdatedAtLeastOnce ? `Последнее обновление: ${date}` : 'Загрузка...' }}</h2>
</template>
