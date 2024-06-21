import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent {
  noteForm: FormGroup;
  isEditMode: boolean = false;
  noteId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private notificationService: NotificationService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.noteId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.noteId;

    if (this.isEditMode) {
      this.noteService.getNoteById(this.noteId).subscribe((note) => {
        this.noteForm.patchValue(note);
      });
    }
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.noteService.updateNoteById(this.noteId, this.noteForm.value).subscribe(() => {
        this.router.navigate(['/']);
        this.notificationService.showMessage('Note updated successfully!');
      });
    } else {
      this.noteService.createNote(this.noteForm.value).subscribe(() => {
        this.router.navigate(['/']);
        this.notificationService.showMessage('Note created successfully!');
      });
    }
  }

  backToList() {
    this.router.navigate(['/']);
  }
}