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

interface HeroDeleteModalProps {
  hero: Hero | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDeleted: () => Promise<void> | void;
}

export function HeroDeleteModal({
  hero,
  isOpen,
  onOpenChange,
  onDeleted,
}: HeroDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleOpenChange(open: boolean) {
    if (!isDeleting) {
      onOpenChange(open);
    }
  }

  async function handleDelete() {
    if (!hero) {
      return;
    }

    setIsDeleting(true);

    try {
      await HeroService.delete(hero.id);
      await onDeleted();
      onOpenChange(false);
      toast.success("Herói excluído com sucesso.");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Não foi possível excluir o herói."),
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[460px] p-0">
        <DialogHeader className="border-b border-[#eceef3] px-8 py-7">
          <DialogTitle>Excluir herói</DialogTitle>
        </DialogHeader>

        <div className="px-8 py-7">
          <p className="text-[15px] leading-6 text-[#4b515c]">
            Tem certeza que deseja excluir{" "}
            <strong className="font-semibold text-[#30343a]">
              {hero?.nickname}
            </strong>
            ? Esta ação não poderá ser desfeita.
          </p>
        </div>

        <DialogFooter className="gap-3 border-t border-[#eceef3] px-8 py-6">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={() => handleOpenChange(false)}
            className="h-10 cursor-pointer rounded-md border-[#e3e5eb] bg-white px-4 text-[#4b515c] shadow-none hover:bg-white hover:text-[#123bcc]"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="h-10 cursor-pointer rounded-md bg-[#dc2638] px-4 text-white shadow-none hover:bg-[#bd1f30] disabled:cursor-not-allowed"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
