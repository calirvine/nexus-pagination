import { Action } from "./Action";

export class ButtonAction extends Action {
  text: string;
  url: string;
  constructor(text: string, url: string, milestoneId: string) {
    super(milestoneId);
    this.text = text;
    this.url = url;
  }
}
