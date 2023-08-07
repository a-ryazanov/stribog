<script setup lang="ts">
import { computed } from 'vue';
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
      label: 'Напряжение',
      data: props.metrics.map((metric) => metric.voltage),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}));
</script>

<template>
  <article>
    <h3>Напряжение, В:</h3>

    <Line :data="chartData" />
  </article>
</template>
