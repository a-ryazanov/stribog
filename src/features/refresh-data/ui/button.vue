<script setup lang="ts">
import { computed } from 'vue';

import { selectedSpot } from '../../../entities/spot';
import { fetchMetrics, fetchDetails } from '../../../shared/api';

const handleButtonClick = async () => {
  const id = selectedSpot.id;

  if (id !== null) {
    await Promise.all([fetchMetrics.execute(id), fetchDetails.execute(id)]);
  }
};

const isDisabled = computed(() =>
  [fetchMetrics.loadingState, fetchDetails.loadingState].some((state) => state === 'pending'),
);
</script>

<template>
  <button @click="handleButtonClick" :disabled="isDisabled" class="refreshButton" type="button">
    Обновить
  </button>
</template>

<style scoped>
.refreshButton {
  font-size: 12px;
}
</style>
