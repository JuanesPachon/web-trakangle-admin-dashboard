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

  createExperience(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('admin_token')
    });
  
    return this.http.post("http://localhost:3000/experiences", formData, { headers: headers });
  }

  editExperience(formData: FormData, experienceId: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('admin_token')
    });

    const filteredFormData = this.filterFormData(formData);

    return this.http.patch(`http://localhost:3000/experiences/${experienceId}`, filteredFormData, {
      headers: headers,
    });
  }

  filterFormData(formData: FormData): FormData {
    const filteredFormData = new FormData();

    formData.forEach((value, key) => {
      if (value !== '' && value !== null && value !== undefined) {
        filteredFormData.append(key, value);
      }
    });

    return filteredFormData;
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
