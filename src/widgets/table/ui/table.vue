<script setup lang="ts">
import { selectedSpot } from '../../../entities/spot';
import { daytime } from '../../../shared/lib';

import ArrowIcon from './arrow.svg';
</script>

<template>
  <table class="table">
    <tr>
      <th>Время</th>
      <th>Ветер</th>
      <th>t°</th>
      <th>U</th>
      <th>p</th>
    </tr>

    <tr v-for="item in selectedSpot.metrics" :key="item.time">
      <td>{{ daytime(new Date(item.time)) }}</td>
      <td class="table__windSpeed">
        <ArrowIcon
          class="table__arrowIcon"
          :style="{ transform: `rotate(${item.azimuth + 180}deg)` }"
        />

        {{ `${item.windSpeed}м/с` }}
      </td>
      <td>{{ `${item.temperature}°C` }}</td>
      <td>{{ `${item.voltage}V` }}</td>
      <td>{{ `${item.pressure} мм.рт.ст.` }}</td>
    </tr>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  text-align: center;
  vertical-align: middle;
  border-collapse: separate;
  border-spacing: 0 4px;
}

.table td,
.table th {
  padding: 4px 0;
}

.table tr:not(:last-child) td {
  border-bottom: 1px solid rgb(239, 239, 239);
}

.table__windSpeed {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table__arrowIcon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
