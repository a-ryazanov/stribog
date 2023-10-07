<script setup lang="ts">
import { computed } from 'vue';

import { LastUpdated } from '../../features/refresh-data';
import { SpotMap, SpotDescription, useSpotDetails, selectedSpot } from '../../entities/spot';
import { fetchDetails } from '../../shared/api';
import { TabLayout } from '../../shared/ui';

useSpotDetails();

const isLoading = computed(
  () => fetchDetails.loadingState === 'idle' || fetchDetails.loadingState === 'pending',
);
</script>

<template>
  <TabLayout
    :loading="isLoading"
    :empty="selectedSpot.details === null"
    :error="fetchDetails.error"
  >
    <LastUpdated :updated-at="fetchDetails.lastResponseTime" />

    <SpotDescription :text="selectedSpot.details!.description" />

    <SpotMap
      v-if="selectedSpot.id !== null"
      :id="selectedSpot.id"
      :lines="selectedSpot.details!.safetyLines"
    />

    <section class="details__footer">
      Мы не гарантируем достоверность информации, так как используем усредненные значения измерений.
      Оценивайте риски, исходя из собственных наблюдений!
    </section>
  </TabLayout>
</template>

<style scoped>
.details__footer {
  margin-top: 2em;
  padding: 12px;
  border: 1px solid #91caff;
  border-radius: 4px;
  font-size: 12px;
  text-align: justify;
  background-color: #e6f4ff;
}
</style>
