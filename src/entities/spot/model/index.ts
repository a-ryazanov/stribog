import { reactive } from 'vue';

interface SelectedSpotStore {
  id: string | null;
  set: (id: string) => void;
}

export const selectedSpot = reactive<SelectedSpotStore>({
  id: null,
  set(id: string) {
    selectedSpot.id = id;
  },
});
