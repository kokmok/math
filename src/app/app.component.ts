import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {SuccessComponent} from "./ui/success/success.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgbCollapse, SuccessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mult';

  isMenuCollapsed = true;
}
