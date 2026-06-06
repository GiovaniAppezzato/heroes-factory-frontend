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
    <section className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-[72px_1fr_72px] md:gap-8">
      <Button
        type="button"
        className="h-9 w-15 rounded-full px-0 cursor-pointer"
      >
        Criar
      </Button>

      <label className="relative block w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#20242a]" />
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
          className="rounded-full px-11"
        />
      </label>

      <Button
        type="button"
        disabled={isLoading}
        onClick={onSearchSubmit}
        className="h-9 w-18 cursor-pointer rounded-full border-0 bg-white px-0 text-[#49505a] shadow-none hover:bg-white hover:text-black"
      >
        Buscar
      </Button>
    </section>
  );
}
