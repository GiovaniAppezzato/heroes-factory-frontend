import api from "@/services/api";
import {
  ActivateHeroResponse,
  CreateHeroParams,
  CreateHeroResponse,
  DeactivateHeroResponse,
  GetHeroResponse,
  GetHeroesParams,
  GetHeroesResponse,
  UpdateHeroParams,
  UpdateHeroResponse,
} from "@/services/api/hero/interfaces";

export default class HeroService {
  static async getHeroes(params?: GetHeroesParams) {
    return api.get<GetHeroesResponse>("/heroes", { params });
  }

  static async getHero(id: string) {
    return api.get<GetHeroResponse>(`/heroes/${id}`);
  }

  static async create(params: CreateHeroParams) {
    return api.post<CreateHeroResponse>("/heroes", params);
  }

  static async update({ id, ...params }: UpdateHeroParams) {
    return api.patch<UpdateHeroResponse>(`/heroes/${id}`, params);
  }

  static async delete(id: string) {
    return api.delete(`/heroes/${id}`);
  }

  static async activate(id: string) {
    return api.patch<ActivateHeroResponse>(`/heroes/${id}/activate`);
  }

  static async deactivate(id: string) {
    return api.patch<DeactivateHeroResponse>(`/heroes/${id}/deactivate`);
  }
}
