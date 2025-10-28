import { create } from 'zustand';

export interface StayFilters {
  airportCode?: string;
  airline?: string;
  genderPreference?: 'Any' | 'Female only' | 'Male only';
  maxPrice?: number;
  minPrice?: number;
  distanceKm?: number;
  amenities: string[];
  safetyFeatures: string[];
}

interface FiltersState {
  filters: StayFilters;
  savedSearches: StayFilters[];
  setFilters: (filters: StayFilters) => void;
  resetFilters: () => void;
  addSavedSearch: (filters: StayFilters) => void;
}

const defaultFilters: StayFilters = {
  genderPreference: 'Any',
  amenities: [],
  safetyFeatures: []
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: defaultFilters,
  savedSearches: [],
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
  addSavedSearch: (filters) =>
    set((state) => ({ savedSearches: [...state.savedSearches, filters] }))
}));
