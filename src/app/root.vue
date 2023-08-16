<script setup lang="ts">
import { markRaw, type Component } from 'vue';

import { Dashboard } from '../widgets/dashboard';
import { Table } from '../widgets/table';
import { Details } from '../widgets/details';
import { RefreshButton } from '../features/refresh-data';
import { SelectSpot, selectedSpot } from '../entities/spot';
import { Tabs, TabView } from '../shared/ui';
import { globalFetch } from '../shared/api';

const tabsViews: Array<TabView> = [
  { name: 'details', title: 'Описание', component: markRaw<Component>(Details) },
  { name: 'chart', title: 'График', component: markRaw<Component>(Dashboard) },
  { name: 'table', title: 'Таблица', component: markRaw<Component>(Table) },
];
</script>

<template>
  <main class="app">
    <header class="app__controls">
      <SelectSpot class="appControls__select" :value="selectedSpot.id" @change="selectedSpot.set" />

      <RefreshButton />
    </header>

    <Tabs :tabs="tabsViews" class="app__tabs" />

    <footer v-if="globalFetch.state !== 'pending'" class="app__footer">
      Мы не гарантируем достоверность информации, так как используем усредненные значения измерений.
      Оценивайте риски, исходя из собственных наблюдений!
    </footer>
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

.app__footer {
  margin-top: 2em;
  padding: 12px;
  border: 1px solid #91caff;
  border-radius: 4px;
  font-size: 12px;
  text-align: justify;
  background-color: #e6f4ff;
}
</style>
