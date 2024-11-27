import { Routes } from '@angular/router';
import {TableComponentComponent} from "./table-component/table-component.component";
import {HomeComponent} from "./home/home.component";
import {ChoiceComponent} from "./choice/choice.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'choices',
    component: ChoiceComponent
    },
      {
        path: 'choices/:table/:operation',
        component: TableComponentComponent
      }


];
