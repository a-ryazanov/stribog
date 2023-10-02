<script setup lang="ts">
import { globalFetch } from '../../../shared/api';
import { selectedSpot } from '../../../entities/spot';

const handleButtonClick = async () => {
  selectedSpot.reset();

  await selectedSpot.fetchMetrics();
};
</script>

<template>
  <button
    @click="handleButtonClick"
    :disabled="globalFetch.state !== 'done'"
    class="refreshButton"
    type="button"
  >
    Обновить
  </button>
</template>

<style scoped>
.refreshButton {
  font-size: 12px;
}
</style>
