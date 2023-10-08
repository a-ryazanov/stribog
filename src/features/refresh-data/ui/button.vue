<script setup lang="ts">
import { computed } from 'vue';

import { selectedSpot } from '../../../entities/spot';
import { fetchMetrics, fetchDetails } from '../../../shared/api';

const handleButtonClick = async () => {
  const id = selectedSpot.id;

  if (id !== null) {
    const [metrics, details] = await Promise.all([
      fetchMetrics.execute(id),
      fetchDetails.execute(id),
    ]);

    selectedSpot.setMetrics(metrics);
    selectedSpot.setDetails(details);
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
