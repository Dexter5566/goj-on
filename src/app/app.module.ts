import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [SpeechSynthesisUtterance],
    bootstrap: [AppComponent]
})
export class AppModule {}
