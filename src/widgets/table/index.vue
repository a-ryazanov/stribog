<script setup lang="ts">
import { selectedSpot, useSpotMetrics } from '../../entities/spot';
import { LastUpdated } from '../../shared/ui';

import SpotTable from './ui/table.vue';

const { state, updatedAt } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <section class="tableSection">
    <p v-if="state === 'pending'" class="table__pendingText">Загрузка...</p>

    <template v-else-if="selectedSpot.metrics.length !== 0">
      <LastUpdated :updatedAt="updatedAt" class="tableSection__updatedAt" />

      <SpotTable />
    </template>

    <h3 v-else-if="state === 'done'" class="table__noDataText">Нет данных</h3>
  </section>
</template>

<style scoped>
.tableSection {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.tableSection__updatedAt {
  margin-bottom: 1em;
}

.table__pendingText {
  margin: 0;
  font-size: 12px;
  color: #8c8c8c;
}

.table__noDataText {
  align-self: center;
}
</style>
