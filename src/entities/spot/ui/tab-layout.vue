<script setup lang="ts">
import { Loading } from '../../../shared/ui';

interface Props {
  loading: boolean;
  empty: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="layout">
    <Loading v-if="props.loading" />

    <slot v-else-if="!props.empty" name="default" />

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
