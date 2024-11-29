import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {Question} from "../shared/models/question.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-score-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './score-modal.component.html',
  styleUrl: './score-modal.component.scss'
})
export class ScoreModalComponent {
  answers: Question[] = [];

  constructor(public activeModal: NgbActiveModal) {
  }

  score() {
    return this.answers.filter(a => a.isOk()).length;
  }
}
