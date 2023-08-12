<script setup lang="ts">
import { VoltageChart } from '../../features/metric-at-spot/voltage';
import { AzimuthChart } from '../../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../../features/metric-at-spot/temperature';

import { selectedSpot } from '../../entities/spot';
</script>

<template>
  <AzimuthChart :metrics="selectedSpot.metrics" />

  <WindSpeedChart :metrics="selectedSpot.metrics" />

  <TemperatureChart :metrics="selectedSpot.metrics" />

  <VoltageChart :metrics="selectedSpot.metrics" />
</template>
