import Image from "next/image";
import moment from "moment";

import { HeroDetailField } from "@/components/hero/hero-detail-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Hero } from "@/interfaces/hero";

interface HeroDetailsModalProps {
  hero: Hero | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function formatDate(date: string) {
  const formattedDate = moment(date).format("DD/MM/YYYY");

  return formattedDate === "Invalid date" ? "-" : formattedDate;
}

export function HeroDetailsModal({
  hero,
  isOpen,
  onOpenChange,
}: HeroDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[82vh] overflow-hidden p-0">
        {hero ? (
          <>
            <DialogHeader className="border-b border-[#eceef3] px-8 py-7">
              <DialogTitle>{hero.nickname}</DialogTitle>
            </DialogHeader>

            <div className="max-h-[calc(82vh-156px)] overflow-y-auto px-8 py-7">
              <div className="flex justify-center">
                <Image
                  src={hero.avatar_url}
                  alt={hero.nickname}
                  width={118}
                  height={118}
                  className="h-[118px] w-[118px] rounded-full object-cover"
                />
              </div>

              <dl className="mt-9 grid grid-cols-1 gap-x-18 gap-y-8 sm:grid-cols-2">
                <HeroDetailField label="Nome completo:" value={hero.name} />
                <HeroDetailField
                  label="Data de nascimento"
                  value={formatDate(hero.date_of_birth)}
                />
                <HeroDetailField label="Universo" value={hero.universe} />
                <HeroDetailField label="Habilidade" value={hero.main_power} />
              </dl>
            </div>

            <DialogFooter className="border-t border-[#eceef3] px-8 py-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-9 cursor-pointer rounded-md border-[#e3e5eb] bg-white px-4 text-[#4b515c] shadow-none hover:bg-white hover:text-[#123bcc]"
              >
                Fechar
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
