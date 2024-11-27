import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {EventManager} from "../shared/event-manager.service";
import {SuccessComponent} from "../ui/success/success.component";
import {Operation, Question} from "../shared/models/question.model";

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {

  score = 0;
  tableNumber = 0;
  operation: string = 'mult';
  asked: number[] = [];
  started = false;
  answered: Question[] = [];
  currentQuestion: Question|null = null;
  propositions: number[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventManager: EventManager) {
    this.activatedRoute.params.subscribe(params => {
      this.tableNumber = params['table'];
      this.operation = params['operation'];
    });
  }

  init() {
    this.score = 0;
    this.asked = [];

    this.answered = [];
    this.propositions = [];
    this.load();
  }

  load() {
    let operation = Operation.MULT;
    if (this.operation === 'div') {
      operation = Operation.DIV;
    } else if (this.operation === 'mixed') {
      operation = this.randomNum() % 2 === 0 ? Operation.DIV : Operation.MULT;
    }
    this.currentQuestion = new Question(this.tableNumber, this.randomNum(), operation);
    while (this.asked.includes(this.currentQuestion.mult)) {
      this.currentQuestion.mult = this.randomNum();
    }
    this.asked.push(this.currentQuestion.mult);
    this.propositions = this.getResponses();

    this.started = true;
  }

  getResponses():  number[] {
    let responses: number[] = [];
    if (this.tableNumber && this.currentQuestion) {
      let goodResponse = this.currentQuestion.operation === Operation.MULT ? this.tableNumber * this.currentQuestion.mult : this.currentQuestion.mult;
      responses = [goodResponse];
      while (responses.length < 4) {
        const deviation = Math.floor(Math.random() * 5) + 1;
        const sign = Math.random() < 0.5 ? -1 : 1;
        const wrongAnswer = goodResponse + deviation * sign;
        if (wrongAnswer > 0 && !responses.includes(wrongAnswer)) {
          responses.push(wrongAnswer);
        }
      }
    }
    responses = this.shuffleArray(responses);

    return this.shuffleArray(responses);
  }

  randomNum(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

   shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange des éléments
    }
    return array;
  }

  answer(response: number) {
    if (this.currentQuestion) {
      this.currentQuestion.answer = response;
      this.answered.push(this.currentQuestion);
      if (this.currentQuestion.isOk()) {
        this.score ++;
        this.eventManager.broadcast(SuccessComponent.SUCCESS_EVENT);
      } else {
        this.eventManager.broadcast(SuccessComponent.FAILED_EVENT)
      }
      if (this.answered.length < 10) {
        this.load();
      } else {
        this.started = false;
      }
    }
  }
}


