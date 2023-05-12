import { gql } from "@apollo/client";
import { BaseTask } from "./BaseTask";
import { FragmentType, graphql, useFragment } from "./gql";
import { PokemonCardFragment as _PokemonCardFragment } from "./gql/graphql";

export const PokemonCardFragment = gql`
  fragment PokemonCard on SlowOnboardingGuideCard {
    id
    title
    description
    complete
    imageUrl
    action {
      text
      url
    }
  }
`;

export function PokemonCard({ fragment }: { fragment: _PokemonCardFragment }) {
  return (
    <BaseTask title={fragment.title} complete={fragment.complete}>
      {fragment.description} <br />
      <br />
      <img src={fragment.imageUrl} />
      <button
        onClick={() => {
          window.location.replace(fragment.action.url);
        }}
      >
        {fragment.action.text}
      </button>
    </BaseTask>
  );
}
