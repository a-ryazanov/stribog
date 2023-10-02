<script setup lang="ts">
import { computed } from 'vue';
import { daytime } from '../../../shared/lib';

interface Props {
  updatedAt: Date | null;
}

const props = defineProps<Props>();

const date = computed(() => (props.updatedAt ? daytime(props.updatedAt) : null));
</script>

<template>
  <p v-if="date !== null" class="lastUpdated__text">
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
