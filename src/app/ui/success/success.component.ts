import { Component } from '@angular/core';
import {EventManager} from "../../shared/event-manager.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  positionX = "0px";
  positionY = "0px";

  public static readonly SUCCESS_EVENT = "SUCCESS_EVENT";

  startAnimation = false;

  constructor(eventManager: EventManager) {
    eventManager.subscribe(SuccessComponent.SUCCESS_EVENT, (coords) => {
      this.positionX = `${(coords[0]-30)}px`;
      this.positionY = `${(coords[1]-30)}px`;
      this.startAnimation = true;
      console.log(coords);
      setTimeout(() => this.startAnimation = false, 500);
    });
  }
}
