import { Component } from '@angular/core';
import {EventManager} from "../../shared/event-manager.service";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  public static readonly SUCCESS_EVENT = "SUCCESS_EVENT";
  public static readonly FAILED_EVENT = "FAILED_EVENT";

  success = false;
  fails = false;

  constructor(eventManager: EventManager) {
    eventManager.subscribe(SuccessComponent.SUCCESS_EVENT, () => {
      this.success = true;
      setTimeout(() => this.success = false, 400);
    });
    eventManager.subscribe(SuccessComponent.FAILED_EVENT, () => {
      this.fails = true;
      setTimeout(() => this.fails = false, 400);
    });
  }
}
