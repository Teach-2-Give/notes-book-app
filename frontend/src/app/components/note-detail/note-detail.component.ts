import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  note: any;
  faArrowLeft = faArrowLeft;

  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService) {
    const id = this.route.snapshot.params['id'];
    this.noteService.getNoteById(id).subscribe((data) => {
      this.note = data;
    });
  }

  backToList() {
    this.router.navigate(['/']);
  }
}