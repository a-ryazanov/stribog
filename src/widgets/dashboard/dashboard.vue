<script setup lang="ts">
import { VoltageChart } from '../../features/metric-at-spot/voltage';
import { AzimuthChart } from '../../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../../features/metric-at-spot/temperature';
import { PressureChart } from '../../features/metric-at-spot/pressure';
import { LastUpdated } from '../../features/refresh-data';
import { selectedSpot, useSpotMetrics } from '../../entities/spot';
import { fetchMetrics } from '../../shared/api';
import { TabLayout } from '../../shared/ui';

useSpotMetrics();
</script>

<template>
  <TabLayout
    :loading="fetchMetrics.loadingState === 'pending'"
    :empty="selectedSpot.metrics.length === 0"
    :error="fetchMetrics.error"
  >
    <LastUpdated :updatedAt="fetchMetrics.lastResponseTime" />

    <AzimuthChart :metrics="selectedSpot.metrics" />

    <WindSpeedChart :metrics="selectedSpot.metrics" />

    <TemperatureChart :metrics="selectedSpot.metrics" />

    <VoltageChart :metrics="selectedSpot.metrics" />

    <PressureChart :metrics="selectedSpot.metrics" />
  </TabLayout>
</template>
