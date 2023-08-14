<script setup lang="ts">
import { ref, KeepAlive, type Component } from 'vue';

export interface TabView {
  name: string;
  title: string;
  component: Component;
}

interface Props {
  tabs: Array<TabView>;
}

const props = defineProps<Props>();

const activeTab = ref(props.tabs[0]);
</script>

<template>
  <section>
    <header class="tabs__header">
      <template v-for="(tab, index) in tabs" :key="tab.name">
        <button
          :disabled="activeTab.name === tab.name"
          :class="{ tabs__button_selected: activeTab.name === tab.name }"
          :style="{ width: `${100 / tabs.length}%` }"
          @click="() => (activeTab = tab)"
          class="tabs__button"
          type="button"
        >
          {{ tab.title }}
        </button>

        <div v-if="index !== tabs.length - 1" class="tabs__separator" />
      </template>
    </header>

    <KeepAlive>
      <component :is="activeTab.component" />
    </KeepAlive>
  </section>
</template>

<style scoped>
.tabs__header {
  display: flex;
}

.tabs__button {
  border-radius: 0;
  font-size: 12px;
}

.tabs__button_selected {
  color: #ffffff;
  background-color: rgb(75, 192, 192);
}

.tabs__button:nth-of-type(1) {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.tabs__button:nth-last-of-type(1) {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

.tabs__separator {
  width: 1px;
  height: 24px;
  color: #ffffff;
}
</style>
