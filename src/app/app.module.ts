import { RxtableModule } from './modules/rxtable/rxtable.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxtableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
