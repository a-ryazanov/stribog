<script setup lang="ts">
import { selectedSpot, useSpotMetrics } from '../../entities/spot';
import { daytime } from '../../shared/lib';

import ArrowIcon from './arrow.svg';

const { state } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <section class="tableSection">
    <p v-if="state === 'pending'" class="table__pendingText">Загрузка...</p>

    <table v-else-if="selectedSpot.metrics.length !== 0" class="table">
      <tr>
        <th>Время</th>
        <th>Ветер</th>
        <th>t°</th>
        <th>U</th>
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
      </tr>
    </table>

    <h3 v-else-if="state === 'done'" class="table__noDataText">Нет данных</h3>
  </section>
</template>

<style scoped>
.tableSection {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

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

.table__pendingText {
  margin: 0;
  font-size: 12px;
  color: #8c8c8c;
}

.table__noDataText {
  align-self: center;
}
</style>
