<script setup lang="ts">
import { watch } from 'vue';

import { useSpots } from '../lib/use-spots.ts';

interface Props {
  value: string | null;
}

interface Emits {
  (e: 'change', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { data, loading } = useSpots();

watch(data, (newValue, oldValue) => {
  if (oldValue.length === 0 && newValue.length !== 0) {
    emit('change', newValue[0].id);
  }
});

const handleChange = (event: Event) => {
  emit('change', (event.target as HTMLSelectElement).value);
};
</script>

<template>
  <article class="select-spot-wrapper">
    <h3>Спот:</h3>

    <select
      :disabled="loading"
      @change="handleChange"
      required
      class="select-spot"
      name="select-spot"
    >
      <option
        v-for="spot in data"
        :key="spot.id"
        :value="spot.id"
        :selected="spot.id === props.value"
      >
        {{ spot.name }}
      </option>
    </select>
  </article>
</template>

<style scoped>
.select-spot-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-spot {
  width: 100%;
  height: 24px;
  margin-left: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
</style>
