<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Line } from 'vue-chartjs';

import { SpotMetrics } from '../../../../shared/api';
import { timeFromISODate } from '../../../../shared/lib';

interface Props {
  metrics: Array<SpotMetrics>;
}

const props = defineProps<Props>();

const chartData = computed(() => ({
  labels: props.metrics.map((metric) => timeFromISODate(metric.time)),
  datasets: [
    {
      label: 'Температура воздуха',
      data: props.metrics.map((metric) => metric.temperature),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}));
</script>

<template>
  <article>
    <h3>Температура воздуха, °C:</h3>

    <Line :data="chartData" />
  </article>
</template>
