import { JobsService } from './service/jobs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading=false;
  title = 'O Amarelinho';
  constructor( ){
  }
}
