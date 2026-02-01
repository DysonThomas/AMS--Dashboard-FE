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
    console.log('aaaa', logs);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrlHeader + '/setUpdateLog', logs, { headers });
  }
  updateShiftStatus(token: string, userId: string) {
    console.log('inside api');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = { userId };
    return this.http.put(this.apiUrlHeader + '/closeshift', body, { headers });
  }
  // Delete a shift
  deleteLog(token: string, log_id: string) {
    console.log(log_id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(this.apiUrlHeader + `/deleteShift?log_id=${log_id}`, { headers });
  }
  // fetch Log
  getLog(token: string, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const params = { startDate, endDate }; // ✅ use params for GET

    return this.http.get(`${this.apiUrlHeader}/getLog`, { headers, params });
  }
  getTotalHours(token: string, data: { startDate: string; endDate: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const params = new HttpParams().set('startDate', data.startDate).set('endDate', data.endDate);

    return this.http.get(`${this.apiUrlHeader}/getTotalHours`, { headers, params });
  }
  // api to get all employee details
  getAllEmployees(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrlHeader}/getAllEmployeeDetails`, { headers });
  }
  // update employee details
  updateEmployeeDetails(token: string, employeeData: any): Observable<any> {
    console.log('API Employee Data:', employeeData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrlHeader}/updateEmployeeDetails`, employeeData, { headers });
  }
  // Update employee status
  updateEmployeeStatus(token: string, userID: string, isActive: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = { userID, isActive };
    return this.http.put(`${this.apiUrlHeader}/updateEmployeeStatus`, body, { headers });
  }
  updateFaceId(token: string, userID: string, isEdit: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = { userID, isEdit };
    return this.http.put(`${this.apiUrlHeader}/updatenewface`, body, { headers });
  }
  getAllStores(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrlHeader}/getAllStores`, { headers });
  }
  updateStoreDetails(token: string, storeData: any): Observable<any> {
    console.log('API Store Data:', storeData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrlHeader}/updateStoreDetails`, storeData, { headers });
  }
  updateStoreStatus(token: string, storeId: string, isActive: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = { storeId, isActive };
    return this.http.put(`${this.apiUrlHeader}/updateStoreStatus`, body, { headers });
  }
}
