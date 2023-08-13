<script setup lang="ts">
import { markRaw, computed, type Component } from 'vue';

import { Dashboard } from '../widgets/dashboard';
import { Table } from '../widgets/table';
import { SelectSpot, selectedSpot, useSpotMetrics } from '../entities/spot';
import { LastUpdated, Tabs, TabView } from '../shared/ui';

const { updatedAt, refetch, state } = useSpotMetrics(() => selectedSpot.id);
const dataIsNotEmpty = computed(() => selectedSpot.metrics.length !== 0);

const tabsViews: Array<TabView> = [
  { name: 'chart', title: 'График', component: markRaw<Component>(Dashboard) },
  { name: 'table', title: 'Таблица', component: markRaw<Component>(Table) },
];
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

      <Tabs v-if="dataIsNotEmpty" :tabs="tabsViews" class="app__tabs" />

      <h3 v-else-if="state === 'done'" class="app__noDataText">Нет данных</h3>
    </template>
  </main>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  margin: 12px 20px;
}

.app__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app__tabs {
  margin-top: 12px;
}

.appControls__select {
  flex: 1 0 auto;
  margin-right: 12px;
}

.appStatus__button {
  font-size: 12px;
}

.app__pendingText {
  margin: 0;
  font-size: 12px;
  color: gray;
}

.app__noDataText {
  align-self: center;
}
</style>
