"use client";

import { useCallback, useEffect, useState } from "react";

import { HeroCard } from "@/components/hero/hero-card";
import { HeroCardSkeleton } from "@/components/hero/hero-card-skeleton";
import { HeroDetailsModal } from "@/components/hero/hero-details-modal";
import { HeroesPagination } from "@/components/hero/heroes-pagination";
import { HeroesToolbar } from "@/components/hero/heroes-toolbar";
import { Hero } from "@/interfaces/hero";
import HeroService from "@/services/api/hero";
import { useHeroesStore } from "@/stores/hero";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { heroes, pagination, updateHeroes, updatePagination } =
    useHeroesStore();

  const fetchHeroes = useCallback(
    async (page: number = 1, searchValue?: string) => {
      setIsFetching(true);

      try {
        const response = await HeroService.getHeroes({
          page,
          search: searchValue || undefined,
        });

        const { data, meta } = response.data;

        updateHeroes(data);
        updatePagination({
          currentPage: meta.page,
          lastPage: meta.total_pages,
          total: meta.total,
          perPage: meta.per_page,
        });
      } catch (error) {
        console.error("An error occurred while fetching heroes:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [updateHeroes, updatePagination],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchHeroes(1);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchHeroes]);

  function handleSearchSubmit() {
    void fetchHeroes(1, search);
  }

  function handlePageChange(page: number) {
    void fetchHeroes(page, search);
  }

  function handleHeroClick(hero: Hero) {
    setSelectedHero(hero);
    setIsDetailsOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#f6f1ef] px-8 py-12 text-[#262a31]">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-[1040px] flex-col">
        <h1 className="text-center text-[31px] font-semibold text-[#123a9f]">
          Heróis
        </h1>

        <div className="mt-12">
          <HeroesToolbar
            search={search}
            isLoading={isFetching}
            onSearchChange={setSearch}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>

        <section className="mt-11 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {isFetching
            ? Array.from({ length: 10 }).map((_, index) => (
                <HeroCardSkeleton key={index} />
              ))
            : heroes.map((hero) => (
                <HeroCard key={hero.id} hero={hero} onClick={handleHeroClick} />
              ))}
        </section>

        <HeroesPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          isLoading={isFetching}
          onPageChange={handlePageChange}
        />

        <HeroDetailsModal
          hero={selectedHero}
          isOpen={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      </div>
    </main>
  );
}
