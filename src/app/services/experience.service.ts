import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private http = inject(HttpClient)

  ExperienceList(page: number, limit?: number): Observable<any> {
    const queryParams = `?page=${page}${limit ? `&limit=${limit}` : ''}`;
    return this.http.get(`http://localhost:3000/experiences/${queryParams}`);
  }

  createExperience(formValues: any){
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    });

    return this.http.post("http://localhost:3000/experiences/", {
      name: formValues.name,
      place: formValues.place,
      price: formValues.price,
      description: formValues.description,
      images: formValues.images
    }, { headers: headers } )

  }
}
