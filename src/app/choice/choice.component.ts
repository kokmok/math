import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-choice',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss'
})
export class ChoiceComponent {

  tables: number[] = [];
  limit = 10;


  constructor() {
    this.tables = [];
    for(let i=0; i < this.limit; i++) {
      this.tables.push(i + 1);
    }
  }
}
