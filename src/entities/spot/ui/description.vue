<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  text: string;
}

const props = defineProps<Props>();
const toggled = ref(true);
</script>

<template>
  <p
    class="description__text"
    :class="{ description__text_toggled: toggled }"
    @click="toggled = !toggled"
  >
    {{ props.text }}
  </p>
</template>

<style scoped>
.description__text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  text-align: justify;
  cursor: pointer;
}

.description__text_toggled {
  -webkit-line-clamp: 2;
}
</style>
