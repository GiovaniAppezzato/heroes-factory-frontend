import { create } from "zustand";
import { Hero } from "@/interfaces/hero";

export interface HeroPagination {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
}

interface HeroesState {
  heroes: Hero[];
  pagination: HeroPagination;
  updateHeroes: (heroes: Hero[]) => void;
  updatePagination: (pagination: HeroPagination) => void;
}

const initialPagination: HeroPagination = {
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 10,
};

export const useHeroesStore = create<HeroesState>((set) => ({
  heroes: [],
  pagination: initialPagination,
  updateHeroes: (heroes) => set({ heroes }),
  updatePagination: (pagination) => set({ pagination }),
}));
