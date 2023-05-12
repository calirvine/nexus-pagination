import { ButtonAction } from "../actions/ButtonAction";
import { OnboardingGuideCard } from "./OnboardingGuideCard";

export class CtaOnboardingGuideCard extends OnboardingGuideCard {
  action: ButtonAction;
  constructor(
    id: string,
    title: string,
    description: string,
    complete: boolean,
    action: ButtonAction
  ) {
    super(id, title, description, complete);
    this.id = id;
    this.title = title;
    this.description = description;
    this.complete = complete;
    this.action = action;
  }
}
