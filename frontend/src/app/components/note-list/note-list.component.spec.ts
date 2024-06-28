import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteListComponent } from './note-list.component';
import { NoteService } from '../../services/note.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let mockNoteService: any;

  beforeEach(async () => {
    mockNoteService = jasmine.createSpyObj(['getAllNotes', 'deleteNoteById']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, FontAwesomeModule, DeleteConfirmationComponent],
      declarations: [NoteListComponent],
      providers: [
        { provide: NoteService, useValue: mockNoteService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    mockNoteService.getAllNotes.and.returnValue(of([{ id: 1, title: 'Test Note', content: 'Test Content' }]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display notes', () => {
    expect(mockNoteService.getAllNotes).toHaveBeenCalled();
    expect(component.notes.length).toBe(1);
    expect(component.notes[0].title).toBe('Test Note');
  });

  it('should handle error while fetching notes', () => {
    mockNoteService.getAllNotes.and.returnValue(throwError(() => new Error('Error fetching notes')));
    component.fetchNotes();
    fixture.detectChanges();
    expect(component.notes.length).toBe(0);
  });

  it('should confirm note deletion', () => {
    component.confirmDelete(1);
    expect(component.noteToDelete).toBe(1);
  });

  it('should cancel note deletion', () => {
    component.cancelDelete();
    expect(component.noteToDelete).toBeNull();
  });

  it('should delete note and refresh the list', () => {
    component.confirmDelete(1);
    mockNoteService.deleteNoteById.and.returnValue(of({}));
    component.deleteNote();
    expect(mockNoteService.deleteNoteById).toHaveBeenCalledWith(1);
    expect(mockNoteService.getAllNotes).toHaveBeenCalled();
    expect(component.noteToDelete).toBeNull();
  });

  it('should handle error while deleting note', () => {
    component.confirmDelete(1);
    mockNoteService.deleteNoteById.and.returnValue(throwError(() => new Error('Error deleting note')));
    component.deleteNote();
    expect(mockNoteService.deleteNoteById).toHaveBeenCalledWith(1);
    expect(component.noteToDelete).toBe(1);
  });

  it('should render FontAwesome icons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('fa-icon[icon="faTrash"]')).toBeTruthy();
    expect(compiled.querySelector('fa-icon[icon="faEdit"]')).toBeTruthy();
    expect(compiled.querySelector('fa-icon[icon="faEye"]')).toBeTruthy();
  });
});