import { Suspense } from "react";
import { BaseTask } from "./BaseTask";
import { CtaCard, CtaCardFragment } from "./CtaCard";
import { GuideFragment as _GuideFragment } from "./gql/graphql";
import { gql } from "@apollo/client";
import { QRCodeCardFragment, QrCodeCard } from "./QrCodeCard";
import { PokemonCard, PokemonCardFragment } from "./PokemonCard";

export const GuideFragment = gql`
  ${CtaCardFragment}
  ${QRCodeCardFragment}
  ${PokemonCardFragment}
  fragment Guide on Guide {
    __typename
    name
    addProductTask {
      ...CtaCard
      ...QrCodeCard
    }
    getAppTask {
      ...CtaCard
      ...QrCodeCard
    }
    ... @defer {
      lookAtAPokemonTask {
        ...CtaCard
        ...QrCodeCard
        ...PokemonCard
      }
    }
  }
`;

export function Guide({ guide }: { guide: _GuideFragment }) {
  console.log("guide: ", { guide });

  return (
    <div>
      <h1>{guide.name}</h1>
      <CardRenderer data={guide.addProductTask} />
      <CardRenderer data={guide.getAppTask} />
      <Suspense fallback={<CardFallback />}>
        <CardRenderer data={guide.lookAtAPokemonTask} />
      </Suspense>
    </div>
  );
}

function CardRenderer({
  data,
}: {
  data: _GuideFragment["addProductTask"] | null | undefined;
}) {
  console.log("Rendering... ", { data });
  if (typeof data === "undefined") {
    console.log("Suspending...");
    throw new Promise((resolve) => setTimeout(resolve, 50));
  }
  if (!data) return null;
  switch (data.__typename) {
    case "CtaOnboardingGuideCard": {
      return <CtaCard fragment={data as any} />;
    }
    case "QrCodeOnboardingGuideCard": {
      return <QrCodeCard fragment={data as any} />;
    }
    case "SlowOnboardingGuideCard": {
      return <PokemonCard fragment={data as any} />;
    }
    default:
      return null;
  }
}

function CardFallback() {
  return (
    <BaseTask title="Loading card..." complete={false}>
      <p>Coming soon</p>
    </BaseTask>
  );
}
