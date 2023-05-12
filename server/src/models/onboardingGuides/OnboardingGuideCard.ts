import { Action } from "../actions";

export class OnboardingGuideCard {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  action: Action | null = null;
  constructor(
    id: string,
    title: string,
    description: string,
    complete: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.complete = complete;
  }
}
