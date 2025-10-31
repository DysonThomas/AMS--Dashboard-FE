import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Attendanceservice {
  private apiUrlHeader = 'http://localhost:3000/api/user'; // Replace with your backend API URL
  constructor(private http: HttpClient) {}
  getAttendance(startDate: string, endDate: string): Observable<any> {
    const apiUrl = `${this.apiUrlHeader}/getattendance`;
    console.log(startDate, endDate); // Add query parameters
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);

    return this.http.get(apiUrl, { params });
  }
  getUsers(): Observable<any> {
    const apiUrl = `${this.apiUrlHeader}/getallemp`;
    return this.http.get(apiUrl);
  }
  getSpecificUserAttendance(userId: string, startDate: string, endDate: string): Observable<any> {
    const apiUrl = `${this.apiUrlHeader}/getspecificattendance`;
    const params = new HttpParams()
      .set('userID', userId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get(apiUrl, { params });
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlHeader + '/logindashboard', credentials, { headers });
  }
  // Verify token and get profile
  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiUrlHeader + '/protected', { headers });
  }
  getRole(): Observable<any> {
    return this.http.get(this.apiUrlHeader + '/getRoles');
  }

  updateattendance(token: string, newattendance: any): Observable<any> {
    console.log(newattendance);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(this.apiUrlHeader + '/updatefacerec', newattendance, { headers });
  }
  updateLog(token: string, logs: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrlHeader + '/setUpdateLog', logs, { headers });
  }
}
