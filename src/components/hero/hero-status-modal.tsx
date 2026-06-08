"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Hero } from "@/interfaces/hero";
import HeroService from "@/services/api/hero";
import { getApiErrorMessage } from "@/utilities/api";

interface HeroStatusModalProps {
  hero: Hero | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStatusChanged: () => Promise<void> | void;
}

export function HeroStatusModal({
  hero,
  isOpen,
  onOpenChange,
  onStatusChanged,
}: HeroStatusModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDeactivation = Boolean(hero?.is_active);

  function handleOpenChange(open: boolean) {
    if (!isSubmitting) {
      onOpenChange(open);
    }
  }

  async function handleConfirm() {
    if (!hero) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (hero.is_active) {
        await HeroService.deactivate(hero.id);
      } else {
        await HeroService.activate(hero.id);
      }

      await onStatusChanged();
      onOpenChange(false);
      toast.success(
        hero.is_active
          ? "Herói desativado com sucesso."
          : "Herói ativado com sucesso.",
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          hero.is_active
            ? "Não foi possível desativar o herói."
            : "Não foi possível ativar o herói.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[460px] p-0">
        <DialogHeader className="border-b border-[#eceef3] px-8 py-7">
          <DialogTitle>
            {isDeactivation ? "Desativar herói" : "Ativar herói"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-7">
          <p className="text-[15px] leading-6 text-[#4b515c]">
            Tem certeza que deseja {isDeactivation ? "desativar" : "ativar"}{" "}
            <strong className="font-semibold text-[#30343a]">
              {hero?.nickname}
            </strong>
            ?
          </p>
        </div>

        <DialogFooter className="gap-3 border-t border-[#eceef3] px-8 py-6">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleOpenChange(false)}
            className="h-10 cursor-pointer rounded-md border-[#e3e5eb] bg-white px-4 text-[#4b515c] shadow-none hover:bg-white hover:text-[#123bcc]"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="h-10 cursor-pointer rounded-md px-4 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
