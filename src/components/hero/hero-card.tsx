import Image from "next/image";
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hero } from "@/interfaces/hero";

interface HeroCardProps {
  hero: Hero;
}

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <article
      className={`relative flex h-[174px] w-full flex-col items-center justify-center rounded-[10px] bg-white px-5 shadow-[0_4px_10px_rgba(31,41,55,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(31,41,55,0.18)] ${
        hero.is_active ? "" : "bg-zinc-100 grayscale"
      }`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Abrir ações de ${hero.nickname}`}
        className="absolute right-2 top-2 size-8 rounded-full text-[#2f3338] hover:bg-[#edf1ff]"
      >
        <MoreVertical className="size-5" />
      </Button>

      <Image
        src={hero.avatar_url}
        alt={hero.nickname}
        width={94}
        height={94}
        className="h-23.5 h-23.5 rounded-full object-cover"
      />

      <strong className="mt-5 max-w-full truncate text-center text-base font-semibold text-[#2f3338]">
        {hero.nickname}
      </strong>
    </article>
  );
}
