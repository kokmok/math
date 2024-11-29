import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {EventManager} from "../shared/event-manager.service";
import {SuccessComponent} from "../ui/success/success.component";
import {Operation, Question} from "../shared/models/question.model";
import {MultipleAnswerComponent} from "../multiple-answer/multiple-answer.component";
import {FreeAnswerComponent} from "../free-answer/free-answer.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScoreModalComponent} from "../score-modal/score-modal.component";

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgIf,
    MultipleAnswerComponent,
    FreeAnswerComponent,
    FaIconComponent
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
  type = 'free';

  constructor(private activatedRoute: ActivatedRoute, private eventManager: EventManager, private modalService: NgbModal) {
    this.activatedRoute.params.subscribe(params => {
      this.tableNumber = params['table'];
      this.operation = params['operation'];
      this.type = params['type'];
    });
  }

  init() {
    this.score = 0;
    this.asked = [];
    this.answered = [];
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


    this.started = true;
  }


  randomNum(): number {
    return Math.floor(Math.random() * 10) + 1;
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

  showResults($event: MouseEvent) {
    $event.preventDefault();
    const modalRef = this.modalService.open(ScoreModalComponent);
    modalRef.componentInstance.answers = this.answered;
  }
}


