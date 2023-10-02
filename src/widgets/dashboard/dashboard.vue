<script setup lang="ts">
import { VoltageChart } from '../../features/metric-at-spot/voltage';
import { AzimuthChart } from '../../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../../features/metric-at-spot/temperature';
import { PressureChart } from '../../features/metric-at-spot/pressure';
import { LastUpdated } from '../../features/refresh-data';
import { selectedSpot, useSpotMetrics, TabLayout } from '../../entities/spot';

useSpotMetrics();
</script>

<template>
  <TabLayout
    :loading="selectedSpot.loadingState === 'pending'"
    :empty="selectedSpot.metrics.length === 0"
  >
    <LastUpdated :updatedAt="selectedSpot.updatedAt" />

    <AzimuthChart :metrics="selectedSpot.metrics" />

    <WindSpeedChart :metrics="selectedSpot.metrics" />

    <TemperatureChart :metrics="selectedSpot.metrics" />

    <VoltageChart :metrics="selectedSpot.metrics" />

    <PressureChart :metrics="selectedSpot.metrics" />
  </TabLayout>
</template>
