<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';

import { SpotMetrics } from '../../../../shared/api';
import { daytime } from '../../../../shared/lib';

interface Props {
  metrics: Array<SpotMetrics>;
}

const props = defineProps<Props>();

const chartData = computed(() => ({
  labels: props.metrics.map((metric) => daytime(new Date(metric.time))),
  datasets: [
    {
      label: 'Скорость ветра',
      data: props.metrics.map((metric) => metric.windSpeed),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}));
</script>

<template>
  <article>
    <h3>Скорость ветра, м/с:</h3>

    <Line :data="chartData" />
  </article>
</template>
