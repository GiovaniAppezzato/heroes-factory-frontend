import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroesToolbarProps {
  search: string;
  isLoading?: boolean;
  onSearchChange: (search: string) => void;
  onSearchSubmit: () => void;
}

export function HeroesToolbar({
  search,
  isLoading = false,
  onSearchChange,
  onSearchSubmit,
}: HeroesToolbarProps) {
  return (
    <section className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-[76px_1fr_78px] md:gap-8">
      <Button
        type="button"
        className="h-10 w-16 cursor-pointer rounded-full px-0 text-sm"
      >
        Criar
      </Button>

      <label className="relative block w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#20242a]" />
        <Input
          type="text"
          value={search}
          disabled={isLoading}
          onChange={(event) => onSearchChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearchSubmit();
            }
          }}
          placeholder="Digite o nome do herói"
          className="h-10 rounded-full px-12 text-[15px]"
        />
      </label>

      <Button
        type="button"
        disabled={isLoading}
        onClick={onSearchSubmit}
        className="h-10 w-[78px] cursor-pointer rounded-full border-0 bg-white px-0 text-sm text-[#49505a] shadow-none hover:bg-white hover:text-black"
      >
        Buscar
      </Button>
    </section>
  );
}
