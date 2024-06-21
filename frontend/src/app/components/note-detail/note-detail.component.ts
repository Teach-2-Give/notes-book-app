import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  note: any;

  constructor(private route: ActivatedRoute, private noteService: NoteService) {
    const id = this.route.snapshot.params['id'];
    this.noteService.getNoteById(id).subscribe((data) => {
      this.note = data;
    });
  }

  backToList(){
    this.router.navigate(['/']);
  }
}