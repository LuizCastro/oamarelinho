import { JobsComponent } from './component/jobs/jobs.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,JobsComponent
  ],
  imports: [
    BrowserModule,FormsModule,CommonModule,NgbModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,JobsComponent],
  exports:[JobsComponent]
})
export class AppModule { }
