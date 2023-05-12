import { gql } from "@apollo/client";
import { BaseTask } from "./BaseTask";
import { FragmentType, graphql, useFragment } from "./gql";
import { CtaCardFragment as _CtaCardFragment } from "./gql/graphql";

export const CtaCardFragment = gql`
  fragment CtaCard on CtaOnboardingGuideCard {
    id
    title
    description
    complete
    action {
      text
      url
    }
  }
`;

export function CtaCard({ fragment }: { fragment: _CtaCardFragment }) {
  return (
    <BaseTask title={fragment.title} complete={fragment.complete}>
      {fragment.description} <br />
      <br />
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
