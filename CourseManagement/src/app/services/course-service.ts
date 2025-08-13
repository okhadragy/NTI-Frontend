import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course, CourseRating } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/courses";

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<{ data: Course[] }>(this.URL)
      .pipe(map(response => response.data));
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<{ data: Course }>(
      this.URL,
      course,
      { headers: this.getAuthHeaders() }
    )
    .pipe(map(response => response.data));
  }

  getCourse(id: string | undefined): Observable<Course> {
    return this.http.get<{ data: Course }>(`${this.URL}/${id}`)
      .pipe(map(response => response.data));
  }

  updateCourse(id: string | undefined, updatedData: Partial<Course>): Observable<Course> {
    return this.http.patch<{ data: Course }>(
      `${this.URL}/${id}`,
      updatedData,
      { headers: this.getAuthHeaders() }
    )
    .pipe(map(response => response.data));
  }

  deleteCourse(id: string | undefined): Observable<string> {
    return this.http.delete<{ message: string }>(
      `${this.URL}/${id}`,
      { headers: this.getAuthHeaders() }
    )
    .pipe(map(response => response.message));
  }

  rateCourse(id: string | undefined, score: number, comment?: string): Observable<CourseRating> {
    return this.http.post<{ rating: CourseRating }>(
      `${this.URL}/${id}/rate`,
      { score, comment },
      { headers: this.getAuthHeaders() }
    )
    .pipe(map(response => response.rating));
  }
}

