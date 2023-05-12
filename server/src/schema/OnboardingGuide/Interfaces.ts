import { Action } from "../../models/actions";
import { OnboardingGuideCard } from "../../models/onboardingGuides/OnboardingGuideCard";
import { builder } from "../builder";

export const GuideInterface = builder.interfaceType(OnboardingGuideCard, {
  name: "GuideInterface",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    complete: t.exposeBoolean("complete"),
    action: t.field({
      type: ActionInterface,
    }),
  }),
});

export const ActionInterface = builder.interfaceType(Action, {
  name: "ActionInterface",
  fields: (t) => ({
    milestoneId: t.exposeString("milestoneId"),
  }),
});
