/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {setupFontAwesome} from "./app/config/font-awesome-icons";

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const library = appRef.injector.get(FaIconLibrary); // Injecte FaIconLibrary
    setupFontAwesome(library); // Configure les icônes
  })
  .catch((err) => console.error(err));
