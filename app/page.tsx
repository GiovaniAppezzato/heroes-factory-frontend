"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { HeroCard } from "@/components/hero/hero-card";
import { HeroCardSkeleton } from "@/components/hero/hero-card-skeleton";
import { HeroCreateModal } from "@/components/hero/hero-create-modal";
import { HeroDeleteModal } from "@/components/hero/hero-delete-modal";
import { HeroDetailsModal } from "@/components/hero/hero-details-modal";
import { HeroEditModal } from "@/components/hero/hero-edit-modal";
import { HeroStatusModal } from "@/components/hero/hero-status-modal";
import { HeroesPagination } from "@/components/hero/heroes-pagination";
import { HeroesToolbar } from "@/components/hero/heroes-toolbar";
import { Hero } from "@/interfaces/hero";
import HeroService from "@/services/api/hero";
import { useHeroesStore } from "@/stores/hero";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [viewHero, setViewHero] = useState<Hero | null>(null);
  const [deleteHero, setDeleteHero] = useState<Hero | null>(null);
  const [editHero, setEditHero] = useState<Hero | null>(null);
  const [toggleHero, setToggleHero] = useState<Hero | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

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
      } catch {
        toast.error("Não foi possível carregar os heróis.");
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
    setViewHero(hero);
    setIsViewOpen(true);
  }

  function handleHeroEdit(hero: Hero) {
    setEditHero(hero);
    setIsEditOpen(true);
  }

  function handleHeroDelete(hero: Hero) {
    setDeleteHero(hero);
    setIsDeleteOpen(true);
  }

  function handleHeroStatusToggle(hero: Hero) {
    setToggleHero(hero);
    setIsToggleOpen(true);
  }

  async function handleHeroCreated() {
    setSearch("");
    await fetchHeroes(1);
  }

  async function handleHeroUpdated() {
    await fetchHeroes(pagination.currentPage, search);
  }

  async function handleHeroDeleted() {
    const targetPage =
      heroes.length === 1 && pagination.currentPage > 1
        ? pagination.currentPage - 1
        : pagination.currentPage;

    await fetchHeroes(targetPage, search);
  }

  async function handleHeroStatusChanged() {
    await fetchHeroes(pagination.currentPage, search);
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
            onCreate={() => setIsCreateOpen(true)}
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
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  onClick={handleHeroClick}
                  onDelete={handleHeroDelete}
                  onEdit={handleHeroEdit}
                  onToggleStatus={handleHeroStatusToggle}
                />
              ))}
        </section>

        {!isFetching && heroes.length === 0 ? (
          <p className="mt-12 rounded-lg bg-white px-6 py-8 text-center text-sm text-[#646a75] shadow-[0_4px_10px_rgba(31,41,55,0.08)]">
            Nenhum herói encontrado.
          </p>
        ) : null}

        <HeroesPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          isLoading={isFetching}
          onPageChange={handlePageChange}
        />

        <HeroDetailsModal
          hero={viewHero}
          isOpen={isViewOpen}
          onOpenChange={setIsViewOpen}
        />

        <HeroCreateModal
          isOpen={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreated={handleHeroCreated}
        />

        <HeroEditModal
          hero={editHero}
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          onUpdated={handleHeroUpdated}
        />

        <HeroDeleteModal
          hero={deleteHero}
          isOpen={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onDeleted={handleHeroDeleted}
        />

        <HeroStatusModal
          hero={toggleHero}
          isOpen={isToggleOpen}
          onOpenChange={setIsToggleOpen}
          onStatusChanged={handleHeroStatusChanged}
        />
      </div>
    </main>
  );
}
