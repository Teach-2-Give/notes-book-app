import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteEditComponent } from './note-edit.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('NoteEditComponent', () => {
  let component: NoteEditComponent;
  let fixture: ComponentFixture<NoteEditComponent>;
  let mockNoteService: any;
  let mockNotificationService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockNoteService = jasmine.createSpyObj(['getNoteById', 'updateNoteById', 'createNote']);
    mockNotificationService = jasmine.createSpyObj(['showMessage']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: 1
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [NoteEditComponent],
      providers: [
        FormBuilder,
        { provide: NoteService, useValue: mockNoteService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditComponent);
    component = fixture.componentInstance;
    mockNoteService.getNoteById.and.returnValue(of({ id: 1, title: 'Test Note', content: 'Test Content' }));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in edit mode with existing note data', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.noteId).toBe(1);
    expect(component.noteForm.value).toEqual({ title: 'Test Note', content: 'Test Content' });
  });

  it('should call updateNoteById on form submit in edit mode', () => {
    component.noteForm.setValue({ title: 'Updated Note', content: 'Updated Content' });
    component.onSubmit();
    expect(mockNoteService.updateNoteById).toHaveBeenCalledWith(1, { title: 'Updated Note', content: 'Updated Content' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(mockNotificationService.showMessage).toHaveBeenCalledWith('Note updated successfully!');
  });

  it('should call createNote on form submit in create mode', () => {
    component.isEditMode = false;
    component.noteForm.setValue({ title: 'New Note', content: 'New Content' });
    component.onSubmit();
    expect(mockNoteService.createNote).toHaveBeenCalledWith({ title: 'New Note', content: 'New Content' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(mockNotificationService.showMessage).toHaveBeenCalledWith('Note created successfully!');
  });

  it('should navigate back to the list', () => {
    component.backToList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});