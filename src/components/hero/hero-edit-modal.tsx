import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { HeroFormField } from "@/components/hero/hero-form-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Hero } from "@/interfaces/hero";
import { updateHeroSchema } from "@/schemas/update-hero-schema";
import HeroService from "@/services/api/hero";
import { CreateHeroParams } from "@/services/api/hero/interfaces";
import { getApiErrorMessage } from "@/utilities/api";

interface HeroEditModalProps {
  hero: Hero | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpdated: () => Promise<void> | void;
}

const defaultValues: CreateHeroParams = {
  name: "",
  nickname: "",
  date_of_birth: "",
  universe: "",
  main_power: "",
  avatar_url: "",
};

function toFormValues(hero: Hero): CreateHeroParams {
  return {
    name: hero.name,
    nickname: hero.nickname,
    date_of_birth: moment(hero.date_of_birth).format("YYYY-MM-DD"),
    universe: hero.universe,
    main_power: hero.main_power,
    avatar_url: hero.avatar_url,
  };
}

export function HeroEditModal({
  hero,
  isOpen,
  onOpenChange,
  onUpdated,
}: HeroEditModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateHeroParams>({
    resolver: yupResolver(updateHeroSchema),
    defaultValues,
  });

  useEffect(() => {
    if (hero && isOpen) {
      reset(toFormValues(hero));
    };
  }, [hero, isOpen, reset]);

  function handleClose() {
    if (isSubmitting) return;
    reset(defaultValues);
    onOpenChange(false);
  }

  async function onSubmit(data: CreateHeroParams) {
    if (!hero) return;

    try {
      await HeroService.update({ id: hero.id, ...data });
      await onUpdated();
      onOpenChange(false);
      toast.success("Herói atualizado com sucesso.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[88vh] overflow-hidden p-0">
        <DialogHeader className="border-b border-[#eceef3] px-8 py-7">
          <DialogTitle>Editar herói</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="max-h-[calc(88vh-164px)] overflow-y-auto px-8 py-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <HeroFormField
                htmlFor="edit-hero-name"
                label="Nome completo"
                error={errors.name?.message}
                fullWidth
              >
                <Input
                  id="edit-hero-name"
                  placeholder="Digite o nome completo"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("name")}
                />
              </HeroFormField>

              <HeroFormField
                htmlFor="edit-hero-nickname"
                label="Nome de guerra"
                error={errors.nickname?.message}
                fullWidth
              >
                <Input
                  id="edit-hero-nickname"
                  placeholder="Digite o nome de guerra"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("nickname")}
                />
              </HeroFormField>

              <HeroFormField
                htmlFor="edit-hero-date-of-birth"
                label="Data de nascimento"
                error={errors.date_of_birth?.message}
              >
                <Input
                  id="edit-hero-date-of-birth"
                  type="date"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("date_of_birth")}
                />
              </HeroFormField>

              <HeroFormField
                htmlFor="edit-hero-universe"
                label="Universo"
                error={errors.universe?.message}
              >
                <Input
                  id="edit-hero-universe"
                  placeholder="Digite o universo"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("universe")}
                />
              </HeroFormField>

              <HeroFormField
                htmlFor="edit-hero-main-power"
                label="Habilidade"
                error={errors.main_power?.message}
              >
                <Input
                  id="edit-hero-main-power"
                  placeholder="Digite a habilidade"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("main_power")}
                />
              </HeroFormField>

              <HeroFormField
                htmlFor="edit-hero-avatar-url"
                label="Avatar"
                error={errors.avatar_url?.message}
              >
                <Input
                  id="edit-hero-avatar-url"
                  type="url"
                  placeholder="Digite a URL"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("avatar_url")}
                />
              </HeroFormField>
            </div>
          </div>

          <DialogFooter className="gap-3 border-t border-[#eceef3] px-8 py-6">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleClose()}
              className="h-10 cursor-pointer rounded-md border-[#e3e5eb] bg-white px-4 text-[#4b515c] shadow-none hover:bg-white hover:text-[#123bcc]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 cursor-pointer rounded-md px-4 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
