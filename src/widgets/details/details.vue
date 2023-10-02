<script setup lang="ts">
import {
  SpotMap,
  SpotDescription,
  useSpotDetails,
  selectedSpot,
  TabLayout,
} from '../../entities/spot';

const { state } = useSpotDetails();
</script>

<template>
  <TabLayout :loading="state === 'pending'" :empty="selectedSpot.details === null">
    <SpotDescription :text="selectedSpot.details!.description" />

    <SpotMap
      v-if="selectedSpot.id !== null"
      :id="selectedSpot.id"
      :lines="selectedSpot.details!.safetyLines"
      class="mapWidget"
    />

    <section class="details__footer">
      Мы не гарантируем достоверность информации, так как используем усредненные значения измерений.
      Оценивайте риски, исходя из собственных наблюдений!
    </section>
  </TabLayout>
</template>

<style scoped>
.details__footer {
  margin-top: 2em;
  padding: 12px;
  border: 1px solid #91caff;
  border-radius: 4px;
  font-size: 12px;
  text-align: justify;
  background-color: #e6f4ff;
}
</style>
