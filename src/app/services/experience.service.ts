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
      'Authorization': 'Bearer ' + localStorage.getItem('admin_token')
    });

    return this.http.post("http://localhost:3000/experiences/", {
      name: formValues.name,
      place: formValues.place,
      price: formValues.price,
      description: formValues.description,
      images: formValues.images
    }, { headers: headers } )

  }
  editExperience(formValues: any, experienceId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    const updateExperience: any = {};

    if (formValues.name) {
      updateExperience.name = formValues.name;
    }
    if (formValues.place) {
      updateExperience.place = formValues.place;
    }
    if (formValues.price) {
      updateExperience.price = formValues.price;
    }
    if (formValues.description) {
      updateExperience.description = formValues.description;
    }

    return this.http.patch(`http://localhost:3000/experiences/${experienceId}`, updateExperience, {
      headers: headers,
    });
  }

  deleteExperience(experienceId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    });

    return this.http.delete(`http://localhost:3000/experiences/${experienceId}`, {
      headers: headers,
    });
  }

}
