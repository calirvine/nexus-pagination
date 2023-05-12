import { QrCodeAction } from "../actions/QrCodeAction";
import { OnboardingGuideCard } from "./OnboardingGuideCard";

export class QrCodeOnboardingGuideCard extends OnboardingGuideCard {
  action: QrCodeAction;
  constructor(
    id: string,
    title: string,
    description: string,
    complete: boolean,
    qrCodeAction: QrCodeAction
  ) {
    super(id, title, description, complete);
    this.action = qrCodeAction;
  }
  static async create(
    id: string,
    title: string,
    description: string,
    complete: boolean,
    qrCodeUrl: string
  ) {
    const action = await QrCodeAction.create(qrCodeUrl, "milestone");
    return new QrCodeOnboardingGuideCard(
      id,
      title,
      description,
      complete,
      action
    );
  }
}
