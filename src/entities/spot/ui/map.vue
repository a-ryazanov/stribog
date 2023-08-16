<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { SpotSafetyLine } from '../../../shared/api';
import { spotMaps } from '../lib/spot-maps.ts';
import { canvasFactory, contextFactory, drawMap } from '../lib/canvas.ts';

interface Props {
  id: string;
  lines: Array<SpotSafetyLine>;
}

const props = defineProps<Props>();

const mapImage = computed<string>(() => spotMaps[props.id]);

onMounted(() => {
  const canvas = canvasFactory('spot-map');
  const context = contextFactory(canvas);
  const image = new Image();

  if (context !== null) {
    image.src = mapImage.value;
    image.onload = () => drawMap({ canvas, context, image, lines: props.lines });
  }
});
</script>

<template>
  <canvas id="spot-map" class="spotMap" />
</template>

<style scoped>
.spotMap {
  width: 100%;
  max-width: 424px;
  border-radius: 4px;
}
</style>
