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
      className={`relative flex h-[190px] w-full flex-col items-center justify-center rounded-[10px] bg-white px-5 shadow-[0_4px_10px_rgba(31,41,55,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(31,41,55,0.18)] ${
        hero.is_active ? "" : "bg-zinc-100 grayscale"
      }`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Abrir ações de ${hero.nickname}`}
        className="absolute right-2.5 top-2.5 size-9 rounded-full text-[#2f3338] hover:bg-[#edf1ff]"
      >
        <MoreVertical className="size-[22px]" />
      </Button>

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
