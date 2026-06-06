import Image from "next/image";
import { MoreVertical, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hero } from "@/interfaces/hero";

interface HeroCardProps {
  hero: Hero;
  onClick?: (hero: Hero) => void;
  onEdit?: (hero: Hero) => void;
}

export function HeroCard({ hero, onClick, onEdit }: HeroCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(hero)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(hero);
        }
      }}
      className={`relative flex h-[190px] w-full cursor-pointer flex-col items-center justify-center rounded-[10px] bg-white px-5 shadow-[0_4px_10px_rgba(31,41,55,0.16)] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(31,41,55,0.18)] focus-visible:ring-2 focus-visible:ring-[#c7d5ff] ${
        hero.is_active ? "" : "bg-zinc-100 grayscale"
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Abrir ações de ${hero.nickname}`}
            onClick={(event) => event.stopPropagation()}
            className="absolute right-2.5 top-2.5 size-9 cursor-pointer rounded-full text-[#2f3338] hover:bg-[#edf1ff]"
          >
            <MoreVertical className="size-[22px]" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-12.7 w-12.7 rounded-lg p-1"
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem
            disabled={!hero.is_active}
            onSelect={() => onEdit?.(hero)}
            aria-label="Editar herói"
            title="Editar herói"
            className="flex h-9 w-9 justify-center p-0"
          >
            <Pencil className="size-5 text-[#123bcc]" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Image
        src={hero.avatar_url}
        alt={hero.nickname}
        width={104}
        height={104}
        className="h-[104px] w-[104px] rounded-full object-cover"
      />

      <strong className="mt-5 max-w-full truncate text-center text-[17px] font-semibold text-[#2f3338]">
        {hero.nickname}
      </strong>
    </article>
  );
}
