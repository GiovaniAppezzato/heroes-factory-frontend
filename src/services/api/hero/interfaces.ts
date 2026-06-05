import { PaginatedResponse } from "@/interfaces/common";
import { Hero } from "@/interfaces/hero";

export interface GetHeroesParams {
  page?: number;
  search?: string;
}

export type GetHeroesResponse = PaginatedResponse<Hero>;

export type GetHeroResponse = Hero;

export interface CreateHeroParams {
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url: string;
}

export type CreateHeroResponse = Hero;

export interface UpdateHeroParams extends Partial<CreateHeroParams> {
  id: string;
}

export type UpdateHeroResponse = Hero;

export type ActivateHeroResponse = Hero;

export type DeactivateHeroResponse = Hero;
