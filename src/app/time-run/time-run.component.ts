import { Component } from '@angular/core';
import {Operation, Question} from "../shared/models/question.model";
import {randomInArray, randomTable} from "../shared/utils";
import {FreeAnswerComponent} from "../free-answer/free-answer.component";
import {NgClass, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ScoreModalComponent} from "../score-modal/score-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventManager} from "../shared/event-manager.service";
import {SuccessComponent} from "../ui/success/success.component";

@Component({
  selector: 'app-time-run',
  standalone: true,
  imports: [
    FreeAnswerComponent,
    NgIf,
    NgClass,
    FaIconComponent
  ],
  templateUrl: './time-run.component.html',
  styleUrl: './time-run.component.scss'
})
export class TimeRunComponent {

  maxSeconds = 60;
  countDown = 60;
  operations = [Operation.MULT, Operation.DIV];
  currentQuestion: Question | undefined;
  answered: Question[] = [];
  started = false;

  constructor(private modalService: NgbModal, private eventManager: EventManager) {

  }

  start(): void {
    this.started = true;
    this.count();
    this.createQuestion();
  }

  createQuestion() {
    let question = new Question(randomTable(), randomTable(), randomInArray(this.operations));
    while (this.answered.some(q =>
      q.mult === question.mult
      && q.table === question.table
      && q.operation === question.operation
    )) {
      question = new Question(randomTable(), randomTable(), randomInArray(this.operations));
    }
    this.currentQuestion = question;
  }

  answer(response: number) {
    if (this.currentQuestion) {
      this.currentQuestion.answer = response;
      if (this.currentQuestion.isOk()) {
        this.eventManager.broadcast(SuccessComponent.SUCCESS_EVENT);
      } else {
        this.eventManager.broadcast(SuccessComponent.FAILED_EVENT);
      }
      this.answered.push(this.currentQuestion);
      this.createQuestion();
    }
  }

  count() {
    setTimeout(() => {
      this.countDown --;
      if (this.countDown) {
        this.count();
      } else {
        this.currentQuestion = undefined;
        this.started = false;
      }
    }, 1000);
  }

  showResults($event: MouseEvent) {
    $event.preventDefault();
    const modalRef = this.modalService.open(ScoreModalComponent);
    modalRef.componentInstance.answers = this.answered;
  }

  score() {
    return this.answered.filter(a => a.isOk()).length;
  }

  restart() {
    this.answered = [];
    this.started = true;
    this.countDown = this.maxSeconds;
    this.count();
    this.createQuestion();
  }
}
