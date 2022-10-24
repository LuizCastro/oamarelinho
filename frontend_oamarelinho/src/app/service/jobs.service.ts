import { IJob } from './../component/jobs/IJobs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) { 

  }
 
  getGroupByCityName(limit:number,term:string){
    if (term === '') {
      return of([]);
    }
    return this.httpClient.get<string[]>(`${environment.api_path}job/list-by-cityname/${limit}/${term}`).pipe(
      map(response => response),
      tap(res => console.log({res}))
    );
  }
  getGroupByTitle(limit:number,term:string){
    if (term === '') {
      return of([]);
    }
    return this.httpClient.get<string[]>(`${environment.api_path}job/list-by-title/${limit}/${term}`).pipe(
      map(response => response),
      tap(res => console.log({res}))
    );
  }

  getJobs(title:string,cityName:string){
    if (title === '' && cityName === '') {
      return of([]);
    }
    let data = {
      title: `${title}`,
      cityName : `${cityName}`,
    };
    return this.httpClient.post<IJob[]>(`${environment.api_path}job/list-jobs`,data);
  }
  getLastJobs(){
    return this.httpClient.get<IJob[]>(`${environment.api_path}job/list-last-jobs/3`);
  }
  
}
