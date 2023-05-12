import SchemaBuilder from "@pothos/core";
import { QrCodeAction } from "../models/actions";
import { OnboardingGuideCard } from "../models/onboardingGuides/OnboardingGuideCard";

export type DataUrl = string;

type Eventual<T> = T | Promise<T>;

export const builder = new SchemaBuilder<{
  Scalars: {
    DataUrl: {
      Input: DataUrl;
      Output: DataUrl;
    };
  };
  Objects: {
    QRCodeAction: Eventual<QrCodeAction>;
    Guide: {
      name: string;
      addProductTask?: Eventual<OnboardingGuideCard>;
      getAppTask?: Eventual<OnboardingGuideCard>;
      lookAtAPokemon?: Eventual<OnboardingGuideCard>;
    };
  };
}>({});
