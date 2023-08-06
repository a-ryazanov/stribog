<script setup lang="ts">
import { SelectSpot, selectedSpot, useSpotMetrics } from '../entities/spot';
import { LastUpdated } from '../shared/ui';

const { data, updatedAt } = useSpotMetrics(() => selectedSpot.id);
</script>

<template>
  <main>
    <LastUpdated :updated-at="updatedAt" />

    <SelectSpot :value="selectedSpot.id" @change="selectedSpot.set" />

    {{ data }}
  </main>
</template>

<style scoped></style>
