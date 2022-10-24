import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IJob } from './IJobs';
import { JobsService } from './../../service/jobs.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})

  
export class JobsComponent implements OnInit {
  public model_job_title: any;
  public model_job_cityName: any;
  public model_jobs : any;
  public show_alert = false;
  public show_not_found = false;
  public loading = false;

  constructor(private jobsService: JobsService, public route: Router) { 
    //this.model_jobs = this.getLastJobs();
    this.model_jobs = [];
    this.show_not_found = (this.model_jobs.length > 0 );
    this.show_alert = false;
    this.route.events.subscribe(ev => {
      console.log(ev)
      if(ev  instanceof  NavigationStart){
        this.loading = true;
      }
      if( ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError ){
        this.loading =  false;
      }
    })
  }

  ngOnInit(): void { 

  }
  
  formatter_job_title = (result: string) => result.toUpperCase();
  formatter_job_cityName = (result: string) => result.toUpperCase();
 
  getGroupByTitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => 
      this.jobsService.getGroupByTitle(5,term)
      
    )
  )
  getGroupByCityName: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => 
      this.jobsService.getGroupByCityName(5,term)
    )
  )
  getJobs() {
    this.show_alert = false;
    this.model_jobs = []
    debounceTime(1000);
    if(!this.model_job_title && !this.model_job_cityName){
      this.show_alert = true;
      return;
    }
    
    this.jobsService.getJobs(this.model_job_title,this.model_job_cityName)
    .subscribe(success => {
      this.model_jobs = success as [];
      console.log("getJOBS",this.model_job_title,this.model_job_cityName,this.model_jobs);
    }, error => {
      console.error('Error');
    });
  }

  getLastJobs(){
    this.jobsService.getLastJobs().subscribe(resp => this.model_jobs = resp as []);
  }
  
}