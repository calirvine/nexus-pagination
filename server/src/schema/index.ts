import { ButtonAction } from "../models/actions";
import { CtaOnboardingGuideCard } from "../models/onboardingGuides/CtaOnboardingGuideCard";
import { QrCodeOnboardingGuideCard } from "../models/onboardingGuides/QrCodeOnboardingGuideCard";
import { SlowOnboardingGuideCard } from "../models/onboardingGuides/SlowOnboardingGuideCard";
import { builder } from "./builder";
import "./OnboardingGuide";
import { Guide } from "./OnboardingGuide";

import faker from "@faker-js/faker";

builder.queryType({
  fields: (t) => ({
    fastField: t.string({
      resolve: () => {
        return "fast";
      },
    }),
    slowField: t.string({
      resolve: () => {
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve("slow");
          }, 1000);
        });
      },
    }),
    guide: t.field({
      type: Guide,
      resolve: () => {
        const ctaCard = new CtaOnboardingGuideCard(
          `${Math.floor(Math.random() * 500)}`,
          "Do your first thing",
          faker.lorem.paragraph(5),
          false,
          new ButtonAction("Get started", "https://example.com", "test")
        );
        const qrCodeCard = QrCodeOnboardingGuideCard.create(
          `${Math.floor(Math.random() * 500)}`,
          "Download the app",
          faker.lorem.paragraph(5),
          false,
          "https://example.com"
        );
        const slowCard = SlowOnboardingGuideCard.create();
        return {
          name: "Onboarding guide",
          addProductTask: ctaCard,
          getAppTask: qrCodeCard,
          lookAtAPokemon: slowCard,
        };
      },
    }),
  }),
});

export const schema = builder.toSchema();
