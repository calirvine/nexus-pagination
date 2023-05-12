import { builder } from "../builder";
import { GuideInterface } from "./Interfaces";

export * from "./Interfaces";
export * from "./Actions";
export * from "./GuideCards";

export const Guide = builder.objectType("Guide", {
  fields: (t) => ({
    name: t.string({
      resolve: (guide) => guide.name,
    }),
    addProductTask: t.field({
      type: GuideInterface,
      nullable: true,
      resolve: (guide) => guide.addProductTask,
    }),
    getAppTask: t.field({
      type: GuideInterface,
      nullable: true,
      resolve: (guide) => guide.getAppTask,
    }),
    lookAtAPokemonTask: t.field({
      type: GuideInterface,
      nullable: true,
      resolve: (guide) => guide.lookAtAPokemon,
    }),
  }),
});
