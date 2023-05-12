export class Action {
  id: never;
  milestoneId: string;
  constructor(milestoneId: string) {
    this.milestoneId = milestoneId;
    this.id = undefined as never;
  }
}
