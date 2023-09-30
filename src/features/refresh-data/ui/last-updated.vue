<script setup lang="ts">
import { computed } from 'vue';
import { daytime } from '../../../shared/lib';

interface Props {
  updatedAt: Date | null;
}

const props = defineProps<Props>();

const date = computed(() => daytime(props.updatedAt ?? new Date()));
</script>

<template>
  <p class="lastUpdated__text">
    {{ `Последнее обновление: ${date}` }}
  </p>
</template>

<style scoped>
.lastUpdated__text {
  margin: 0;
  font-size: 12px;
  color: rgb(128, 128, 128);
}
</style>
