import {Component, effect, EventEmitter, input, model, Output} from '@angular/core';
import {Operation, Question} from "../shared/models/question.model";

@Component({
  selector: 'app-multiple-answer',
  standalone: true,
  imports: [],
  templateUrl: './multiple-answer.component.html',
  styleUrl: './multiple-answer.component.scss'
})
export class MultipleAnswerComponent {
  propositions: number[] = [];

  @Output()
  answered = new EventEmitter<number>;

  question = input.required<Question>();

  constructor() {
    effect(() => {
      this.propositions = this.getResponses();
    });
  }

  getResponses():  number[] {
    let responses: number[] = [];

      let goodResponse = this.question().operation === Operation.MULT ? this.question().table * this.question().mult : this.question().mult;
      responses = [goodResponse];
      while (responses.length < 4) {
        const deviation = Math.floor(Math.random() * 5) + 1;
        const sign = Math.random() < 0.5 ? -1 : 1;
        const wrongAnswer = goodResponse + deviation * sign;
        if (wrongAnswer > 0 && !responses.includes(wrongAnswer)) {
          responses.push(wrongAnswer);
        }
      }

    responses = this.shuffleArray(responses);

    return this.shuffleArray(responses);
  }


  shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange des éléments
    }
    return array;
  }

  answer(response: number) {
    this.answered.emit(response);
  }
}
