import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, DeleteConfirmationComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  notes: any[] = [];
  faTrash = faTrash;
  faEdit = faEdit;
  faEye = faEye;
  noteToDelete: number | null = null;

  constructor(private noteService: NoteService) {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  confirmDelete(id: number) {
    this.noteToDelete = id;
  }

  cancelDelete() {
    this.noteToDelete = null;
  }

  deleteNote() {
    if (this.noteToDelete !== null) {
      this.noteService.deleteNoteById(this.noteToDelete).subscribe({
        next: () => {
          this.fetchNotes();
          this.noteToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting note:', error);
        }
      });
    }
  }
}