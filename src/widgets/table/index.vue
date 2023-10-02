<script setup lang="ts">
import { LastUpdated } from '../../features/refresh-data';
import { selectedSpot, useSpotMetrics, TabLayout } from '../../entities/spot';

import SpotTable from './ui/table.vue';

useSpotMetrics();
</script>

<template>
  <TabLayout
    :loading="selectedSpot.loadingState === 'pending'"
    :empty="selectedSpot.metrics.length === 0"
  >
    <LastUpdated :updatedAt="selectedSpot.updatedAt" class="tableSection__updatedAt" />

    <SpotTable />
  </TabLayout>
</template>

<style scoped>
.tableSection__updatedAt {
  margin-bottom: 1em;
}
</style>
