import {Question} from "../shared/models/question.model";

export enum SessionType {
  FREE ='FREE', CHOICE = 'CHOICE', TIME = 'TIME'
}

export class Session {
  constructor(public date?: Date, public questions?: Question[], public type?: SessionType) {
  }
}
