<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { selectedSpot } from '../model';
import { spotMaps } from '../lib/spot-maps.ts';
import { canvasFactory, contextFactory, drawMap } from '../lib/canvas.ts';

const mapImage = computed<string | null>(() =>
  selectedSpot.id !== null && selectedSpot.id in spotMaps ? spotMaps[selectedSpot.id] : null,
);

onMounted(() => {
  const canvas = canvasFactory('spot-map');
  const context = contextFactory(canvas);
  const image = new Image();

  if (typeof mapImage.value === 'string' && context !== null) {
    image.src = mapImage.value;
    image.onload = () => drawMap({ canvas, context, image });
  }
});
</script>

<template>
  <canvas v-if="mapImage !== null" id="spot-map" class="map" />
</template>

<style scoped>
.map {
  width: 100%;
  max-width: 424px;
  border-radius: 4px;
}
</style>
