import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNoteById(id: number, note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, note);
  }

  deleteNoteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}