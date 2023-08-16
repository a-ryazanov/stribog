<script setup lang="ts">
import { markRaw, type Component } from 'vue';

import { Dashboard } from '../widgets/dashboard';
import { Table } from '../widgets/table';
import { Details } from '../widgets/details';
import { SelectSpot, selectedSpot } from '../entities/spot';
import { Tabs, TabView } from '../shared/ui';

const tabsViews: Array<TabView> = [
  { name: 'details', title: 'Описание', component: markRaw<Component>(Details) },
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

    <Tabs :tabs="tabsViews" class="app__tabs" />
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
</style>
