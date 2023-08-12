<script setup lang="ts">
import { selectedSpot } from '../../entities/spot';
import { daytime } from '../../shared/lib';

import ArrowIcon from './arrow.svg';
</script>

<template>
  <table class="table">
    <tr>
      <th>Время</th>
      <th>Температура</th>
      <th>Ветер</th>
      <th>Напряжение</th>
    </tr>

    <tr v-for="item in selectedSpot.metrics" :key="item.time">
      <td>{{ daytime(new Date(item.time)) }}</td>
      <td>{{ `${item.temperature}°C` }}</td>
      <td class="table__windSpeed">
        <ArrowIcon
          class="table__arrowIcon"
          :style="{ transform: `rotate(${item.azimuth + 180}deg)` }"
        />

        {{ `${item.windSpeed}м/с` }}
      </td>
      <td>{{ `${item.voltage}В` }}</td>
    </tr>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  margin-top: 1em;
  text-align: center;
}

.table__windSpeed {
  display: flex;
  align-items: center;
}

.table__arrowIcon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
