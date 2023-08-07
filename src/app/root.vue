<script setup lang="ts">
import { AzimuthChart } from '../features/metric-at-spot/azimuth';
import { WindSpeedChart } from '../features/metric-at-spot/wind-speed';
import { TemperatureChart } from '../features/metric-at-spot/temperature';
import { VoltageChart } from '../features/metric-at-spot/voltage';
import { SelectSpot, selectedSpot, useSpotMetrics } from '../entities/spot';
import { LastUpdated } from '../shared/ui';

const { data, updatedAt, refetch, state } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <main class="app">
    <section class="app__controls">
      <SelectSpot class="appControls__select" :value="selectedSpot.id" @change="selectedSpot.set" />

      <button @click="refetch" :disabled="state !== 'done'" class="appStatus__button" type="button">
        Обновить
      </button>
    </section>

    <p v-if="state !== 'done'" class="app__pendingText">Загрузка...</p>

    <template v-else>
      <LastUpdated :updated-at="updatedAt" />

      <template v-if="data.length !== 0">
        <AzimuthChart :metrics="data" />

        <WindSpeedChart :metrics="data" />

        <TemperatureChart :metrics="data" />

        <VoltageChart :metrics="data" />
      </template>

      <h3 v-else-if="state === 'done'">Нет данных</h3>
    </template>
  </main>
</template>

<style scoped>
.app {
  margin: 12px 20px;
}

.app__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.appControls__select {
  flex: 1 0 auto;
  margin-right: 12px;
}

.app__pendingText {
  margin: 0;
  font-size: 12px;
  color: gray;
}
</style>
