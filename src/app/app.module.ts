import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppService } from './app.service';
import { SslDescriptionComponent } from './ssl-description/ssl-description.component';
import  {SafeHtmlPipe } from './pipes/safeHtml.pipe';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, SslDescriptionComponent, SafeHtmlPipe ],
  providers:    [ AppService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
