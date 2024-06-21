import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  notes: any[] = [];

  constructor(private noteService: NoteService) {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (data) => {
        console.log('Fetched notes:', data); // Debugging log
        this.notes = data;
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNoteById(id).subscribe({
      next: () => {
        this.fetchNotes();
      },
      error: (error) => {
        console.error('Error deleting note:', error);
      }
    });
  }
}