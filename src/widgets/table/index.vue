<script setup lang="ts">
import { LastUpdated } from '../../features/refresh-data';
import { selectedSpot, useSpotMetrics } from '../../entities/spot';
import { fetchMetrics } from '../../shared/api';
import { TabLayout } from '../../shared/ui';

import SpotTable from './ui/table.vue';

useSpotMetrics();
</script>

<template>
  <TabLayout
    :loading="fetchMetrics.loadingState === 'pending'"
    :empty="selectedSpot.metrics.length === 0"
    :error="fetchMetrics.error"
  >
    <LastUpdated :updatedAt="fetchMetrics.lastResponseTime" class="tableSection__updatedAt" />

    <SpotTable />
  </TabLayout>
</template>

<style scoped>
.tableSection__updatedAt {
  margin-bottom: 1em;
}
</style>
