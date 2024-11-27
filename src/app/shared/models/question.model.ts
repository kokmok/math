export enum Operation {
  MULT = "mult",
  DIV = "div",
}

export class Question {

  answer: number | null = null;

  constructor(public table: number, public mult: number, public operation: Operation) {
  }

  isOk(): boolean {
    if (!this.answer) {
      return false;
    }
    let valid = false;
    if (this.operation === Operation.MULT) {
      valid = this.answer === this.table * this.mult;
    }
    if (this.operation === Operation.DIV) {
      valid = this.answer === this.mult;
    }
    return valid;
  }
}
