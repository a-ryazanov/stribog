<script setup lang="ts">
import { KeepAlive } from 'vue';

import Loading from './loading.vue';
import Error from './error.vue';

interface Props {
  loading: boolean;
  empty: boolean;
  error: string | null;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="layout">
    <Loading v-if="props.loading" />

    <Error v-else-if="props.error !== null" :text="props.error" />

    <KeepAlive v-else-if="!props.empty">
      <slot name="default" />
    </KeepAlive>

    <h3 v-else class="layout__noDataText">Нет данных</h3>
  </section>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.layout__noDataText {
  align-self: center;
}
</style>
