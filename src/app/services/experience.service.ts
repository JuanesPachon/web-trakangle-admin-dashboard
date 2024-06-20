import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private http = inject(HttpClient)

  ExperienceList(){
    return this.http.get('http://localhost:3000/experiences')
  }
}
