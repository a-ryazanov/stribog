<script setup lang="ts">
import { VoltageChart } from '../../features/metric-at-spot/voltage';
import { AzimuthChart } from '../../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../../features/metric-at-spot/temperature';
import { selectedSpot, useSpotMetrics } from '../../entities/spot';
import { LastUpdated } from '../../shared/ui';

const { state, updatedAt } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <section class="dashboard">
    <p v-if="state === 'pending'" class="dashboard__pendingText">Загрузка...</p>

    <template v-else-if="selectedSpot.metrics.length !== 0">
      <LastUpdated :updatedAt="updatedAt" />

      <AzimuthChart :metrics="selectedSpot.metrics" />

      <WindSpeedChart :metrics="selectedSpot.metrics" />

      <TemperatureChart :metrics="selectedSpot.metrics" />

      <VoltageChart :metrics="selectedSpot.metrics" />
    </template>

    <h3 v-else-if="state === 'done'" class="dashboard__noDataText">Нет данных</h3>
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.dashboard__pendingText {
  margin: 0;
  font-size: 12px;
  color: #8c8c8c;
}

.dashboard__noDataText {
  align-self: center;
}
</style>
