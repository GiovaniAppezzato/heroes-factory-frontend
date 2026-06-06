"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createHeroSchema } from "@/schemas/create-hero-schema";
import HeroService from "@/services/api/hero";
import { CreateHeroParams } from "@/services/api/hero/interfaces";
import { getApiErrorMessage } from "@/utilities/api";

interface HeroCreateModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreated: () => Promise<void> | void;
}

const defaultValues: CreateHeroParams = {
  name: "",
  nickname: "",
  date_of_birth: "",
  universe: "",
  main_power: "",
  avatar_url: "",
};

export function HeroCreateModal({
  isOpen,
  onOpenChange,
  onCreated,
}: HeroCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateHeroParams>({
    resolver: yupResolver(createHeroSchema),
    defaultValues,
  });

  function handleOpenChange(open: boolean) {
    if (!open && !isSubmitting) {
      reset();
    }

    onOpenChange(open);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await HeroService.create(data);
      await onCreated();
      reset();
      onOpenChange(false);
      toast.success("Herói criado com sucesso.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-hidden p-0">
        <DialogHeader className="border-b border-[#eceef3] px-8 py-7">
          <DialogTitle>Criar herói</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate>
          <div className="max-h-[calc(88vh-164px)] overflow-y-auto px-8 py-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <FormField
                htmlFor="hero-name"
                label="Nome completo"
                error={errors.name?.message}
                fullWidth
              >
                <Input
                  id="hero-name"
                  placeholder="Digite o nome completo"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("name")}
                />
              </FormField>

              <FormField
                htmlFor="hero-nickname"
                label="Nome de guerra"
                error={errors.nickname?.message}
                fullWidth
              >
                <Input
                  id="hero-nickname"
                  placeholder="Digite o nome de guerra"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("nickname")}
                />
              </FormField>

              <FormField
                htmlFor="hero-date-of-birth"
                label="Data de nascimento"
                error={errors.date_of_birth?.message}
              >
                <Input
                  id="hero-date-of-birth"
                  type="date"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("date_of_birth")}
                />
              </FormField>

              <FormField
                htmlFor="hero-universe"
                label="Universo"
                error={errors.universe?.message}
              >
                <Input
                  id="hero-universe"
                  placeholder="Digite o universo"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("universe")}
                />
              </FormField>

              <FormField
                htmlFor="hero-main-power"
                label="Habilidade"
                error={errors.main_power?.message}
              >
                <Input
                  id="hero-main-power"
                  placeholder="Digite a habilidade"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("main_power")}
                />
              </FormField>

              <FormField
                htmlFor="hero-avatar-url"
                label="Avatar"
                error={errors.avatar_url?.message}
              >
                <Input
                  id="hero-avatar-url"
                  type="url"
                  placeholder="Digite a URL"
                  disabled={isSubmitting}
                  className="h-11 rounded-full border-[#e1e3e8] px-4 focus:border-[#e1e3e8]"
                  {...register("avatar_url")}
                />
              </FormField>
            </div>
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

interface FormFieldProps {
  error?: string;
  htmlFor: string;
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

function FormField({
  error,
  htmlFor,
  label,
  children,
  fullWidth = false,
}: FormFieldProps) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-[#30343a]"
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
