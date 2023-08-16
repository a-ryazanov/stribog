<script setup lang="ts">
import { globalFetch } from '../../../shared/api';
import { selectedSpot, useSpotDetails, useSpotMetrics } from '../../../entities/spot';

const { refetch: refetchMetrics } = useSpotMetrics(() => selectedSpot.id, { immediate: false });
const { refetch: refetchDetails } = useSpotDetails(() => selectedSpot.id, { immediate: false });

const handleButtonClick = async () => {
  await Promise.all([refetchMetrics(), refetchDetails()]);
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
