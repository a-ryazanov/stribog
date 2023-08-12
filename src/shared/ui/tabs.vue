<script setup lang="ts">
import { ref, Component } from 'vue';

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
    <header>
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :disabled="activeTab.name === tab.name"
        :style="{ width: `${100 / tabs.length}%` }"
        @click="() => (activeTab = tab)"
        class="tabs__button"
        type="button"
      >
        {{ tab.title }}
      </button>
    </header>

    <section>
      <component :is="activeTab.component" />
    </section>
  </section>
</template>

<style scoped>
.tabs__button {
  border-radius: 0;
  font-size: 12px;
}

.tabs__button:nth-of-type(1) {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}

.tabs__button:nth-last-of-type(1) {
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
