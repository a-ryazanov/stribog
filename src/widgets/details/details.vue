<script setup lang="ts">
import { SpotMap, SpotDescription, useSpotDetails, selectedSpot } from '../../entities/spot';

const { data, state } = useSpotDetails(() => selectedSpot.id);
</script>

<template>
  <section class="details">
    <p v-if="state !== 'done'" class="details__pendingText">Загрузка...</p>

    <template v-if="data !== null">
      <SpotDescription :text="data.description" />

      <SpotMap
        v-if="selectedSpot.id !== null"
        :id="selectedSpot.id"
        :lines="data.safetyLines"
        class="mapWidget"
      />
    </template>
  </section>
</template>

<style scoped>
.details {
  margin-top: 1em;
}

.details__pendingText {
  margin: 0;
  font-size: 12px;
  color: #8c8c8c;
}
</style>
