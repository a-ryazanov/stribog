<script setup lang="ts">
import { AzimuthChart } from '../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../features/metric-at-spot/temperature';
import { VoltageChart } from '../features/metric-at-spot/voltage';
import { SelectSpot, selectedSpot, useSpotMetrics } from '../entities/spot';
import { LastUpdated } from '../shared/ui';

const { data, updatedAt } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <main>
    <SelectSpot :value="selectedSpot.id" @change="selectedSpot.set" />

    <LastUpdated :updated-at="updatedAt" />

    <template v-if="data.length !== 0">
      <AzimuthChart :metrics="data" />

      <WindSpeedChart :metrics="data" />

      <TemperatureChart :metrics="data" />

      <VoltageChart :metrics="data" />
    </template>
  </main>
</template>

<style scoped></style>
