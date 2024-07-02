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
    return this.http.get(`https://web-trekangle-server.onrender.com/experiences/${queryParams}`);
  }

  createExperience(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('admin_token')
    });
  
    return this.http.post("https://web-trekangle-server.onrender.com/experiences", formData, { headers: headers });
  }

  editExperience(formData: FormData, experienceId: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('admin_token')
    });

    const filteredFormData = this.filterFormData(formData);

    return this.http.patch(`https://web-trekangle-server.onrender.com/experiences/${experienceId}`, filteredFormData, {
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

    return this.http.delete(`https://web-trekangle-server.onrender.com/experiences/${experienceId}`, {
      headers: headers,
    });
  }

}
