import { CtaOnboardingGuideCard } from "../../models/onboardingGuides/CtaOnboardingGuideCard";
import { QrCodeOnboardingGuideCard } from "../../models/onboardingGuides/QrCodeOnboardingGuideCard";
import { SlowOnboardingGuideCard } from "../../models/onboardingGuides/SlowOnboardingGuideCard";
import { builder } from "../builder";
import { ButtonActionType, QRCodeAction } from "./Actions";
import { GuideInterface } from "./Interfaces";

builder.objectType(CtaOnboardingGuideCard, {
  name: "CtaOnboardingGuideCard",
  interfaces: [GuideInterface],
  isTypeOf: (card) => card instanceof CtaOnboardingGuideCard,
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    complete: t.exposeBoolean("complete"),
    action: t.field({
      type: ButtonActionType,
      resolve: (card) => card.action,
    }),
  }),
});

builder.objectType(QrCodeOnboardingGuideCard, {
  name: "QrCodeOnboardingGuideCard",
  interfaces: [GuideInterface],
  isTypeOf: (card) => card instanceof QrCodeOnboardingGuideCard,
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    complete: t.exposeBoolean("complete"),
    action: t.field({
      type: QRCodeAction,
      resolve: (card) => card.action,
    }),
  }),
});

builder.objectType(SlowOnboardingGuideCard, {
  name: "SlowOnboardingGuideCard",
  interfaces: [GuideInterface],
  isTypeOf: (card) => card instanceof SlowOnboardingGuideCard,
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    complete: t.exposeBoolean("complete"),
    action: t.field({
      type: ButtonActionType,
      resolve: (card) => card.action,
    }),
    imageUrl: t.exposeString("imageUrl"),
  }),
});
