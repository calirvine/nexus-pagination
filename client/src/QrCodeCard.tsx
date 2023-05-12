import { gql } from "@apollo/client";
import { BaseTask } from "./BaseTask";
import { QrCodeCardFragment as _QrCodeCardFragment } from "./gql/graphql";

export const QRCodeCardFragment = gql`
  fragment QrCodeCard on QrCodeOnboardingGuideCard {
    id
    title
    description
    complete
    action {
      dataUrl
    }
  }
`;

export function QrCodeCard({ fragment }: { fragment: _QrCodeCardFragment }) {
  return (
    <BaseTask title={fragment.title} complete={fragment.complete}>
      {fragment.description} <br />
      <br />
      <img src={fragment.action.dataUrl} />
    </BaseTask>
  );
}
