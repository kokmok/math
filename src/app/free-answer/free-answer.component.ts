import {Component, effect, EventEmitter, input, Output} from '@angular/core';
import {Question} from "../shared/models/question.model";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-free-answer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './free-answer.component.html',
  styleUrl: './free-answer.component.scss'
})
export class FreeAnswerComponent {

  @Output()
  answered = new EventEmitter<number>;

  response = '';

  answer() {
    this.answered.emit(parseInt(this.response));
    this.response = '';
  }

  appendResponse(s: string) {
    this.response += s;
  }

  backSpace() {
    this.response = this.response.substring(0, this.response.length - 1);
  }
}
