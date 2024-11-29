import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-choice',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss'
})
export class ChoiceComponent {

  tables: number[] = [];
  limit = 10;
  operation = 'mult' ;
  type = 'choices'

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.type = params['type']);
    this.tables = [];
    for(let i=0; i < this.limit; i++) {
      this.tables.push(i + 1);
    }
  }
}
