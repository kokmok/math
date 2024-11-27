import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {EventManager} from "../shared/event-manager.service";
import {SuccessComponent} from "../ui/success/success.component";

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
  asked: number[] = [];
  currentMult=0;
  started = false;
  answers: Answer[] = [];
  propositions: number[] = [];

  constructor(private activatedRoute: ActivatedRoute, private eventManager: EventManager) {
    this.activatedRoute.params.subscribe(params => this.tableNumber = params['table']);
  }

  init() {
    this.score = 0;
    this.asked = [];
    this.currentMult=0;

    this.answers = [];
    this.propositions = [];
    this.load();
  }

  load() {
    this.currentMult = this.randomNum();
    while (this.asked.includes(this.currentMult)) {
      this.currentMult = this.randomNum();
    }
    this.asked.push(this.currentMult);
    this.propositions = this.getResponses();

    this.started = true;

  }

  getResponses():  number[] {
    let responses: number[] = [];
    if (this.tableNumber) {
      responses = [this.tableNumber * this.currentMult];
      while (responses.length < 4) {
        const deviation = Math.floor(Math.random() * 5) + 1; // écart entre 1 et 5
        const sign = Math.random() < 0.5 ? -1 : 1; // choisir + ou -
        const wrongAnswer = this.tableNumber * this.currentMult + deviation * sign;

        // Vérifier que la réponse est positive et unique
        if (wrongAnswer > 0 && !responses.includes(wrongAnswer)) {
          responses.push(wrongAnswer);
        }
      }
    }
    responses = this.shuffleArray(responses);
    console.log('responses', responses);

    return this.shuffleArray(responses);
  }

  wrongAnswer(correctAnswer: number):  number {
    const deviation = Math.floor(Math.random() * 5) + 1;
    const sign = Math.random() < 0.5 ? -1 : 1;
    const wrongAnswer = correctAnswer + deviation * sign;

    // Vérifier que la réponse est positive et unique
    if (wrongAnswer > 0) {
      return wrongAnswer;
    }
    return this.wrongAnswer(correctAnswer);
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


  answer(response: number, event: MouseEvent) {
    const answer = {table: this.tableNumber, mult: this.currentMult, response: response, ok: this.tableNumber * this.currentMult === response}
    this.answers.push(answer);
    if (answer.ok) {
      this.score ++;
      this.eventManager.broadcast(SuccessComponent.SUCCESS_EVENT, event.clientX, event.clientY);
    }
    if (this.answers.length < 10) {
      this.load();
    } else {
      this.started = false;
    }

  }
}

export interface Answer {
  table: number;
  mult: number;
  response: number;
  ok: boolean
}
