import * as yup from "yup";

import { CreateHeroParams } from "@/services/api/hero/interfaces";

export const createHeroSchema: yup.ObjectSchema<CreateHeroParams> = yup.object({
  name: yup
    .string()
    .trim()
    .required("Informe o nome completo.")
    .max(120, "O nome completo deve ter no máximo 120 caracteres."),
  nickname: yup
    .string()
    .trim()
    .required("Informe o nome de guerra.")
    .max(80, "O nome de guerra deve ter no máximo 80 caracteres."),
  date_of_birth: yup
    .string()
    .required("Informe a data de nascimento.")
    .test("valid-date", "Informe uma data válida.", (value) => {
      if (!value) {
        return false;
      }

      const date = new Date(`${value}T00:00:00`);
      
      return !Number.isNaN(date.getTime()) && date <= new Date();
    }),
  universe: yup
    .string()
    .trim()
    .required("Informe o universo.")
    .max(80, "O universo deve ter no máximo 80 caracteres."),
  main_power: yup
    .string()
    .trim()
    .required("Informe a habilidade.")
    .max(120, "A habilidade deve ter no máximo 120 caracteres."),
  avatar_url: yup
    .string()
    .trim()
    .required("Informe a URL do avatar.")
    .url("Informe uma URL válida.")
    .max(2048, "A URL deve ter no máximo 2048 caracteres."),
});
