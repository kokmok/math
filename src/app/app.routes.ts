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
    path: ':type',
    component: ChoiceComponent
    },
    {
      path: ':type/:table/:operation',
      component: TableComponentComponent
    }


];
