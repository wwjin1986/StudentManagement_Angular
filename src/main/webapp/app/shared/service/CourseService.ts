import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/model/courseWithTN-dto.model';
import { share, shareReplay } from 'rxjs/operators';

@Injectable()
export class CourseService {
  private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
  private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
  private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
  private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
  private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
  private registerUrl = SERVER_API_URL + '/api/course/registerCourse';

  constructor(private http: HttpClient) {}

  getCourseInfo(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
  }

  getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
    return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
  }

  delete(courseName: String): Observable<Response> {
    global.console.log(`${this.courseDeleteUrl}/${courseName}`);
    return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
  }

  update(course: CourseDto): Observable<Response> {
    return this.http.put<Response>(this.courseUpdateUrl, course);
  }
  register(courseName: String): Observable<Response> {
    return this.http
      .post<Response>(`${this.registerUrl}/${courseName}`, { courseName })
      .pipe(shareReplay());
  }
  addCourseToStudent(courseName: String): Observable<Response> {
    return this.http.post<Response>(SERVER_API_URL + '/api/course/addCourseToStudent', { courseName });
  }
}
