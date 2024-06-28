import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailComponent } from './note-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;
  let mockNoteService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockNoteService = jasmine.createSpyObj(['getNoteById']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: 1
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FontAwesomeModule],
      declarations: [NoteDetailComponent],
      providers: [
        { provide: NoteService, useValue: mockNoteService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    mockNoteService.getNoteById.and.returnValue(of({ id: 1, title: 'Test Note' }));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the note by ID', () => {
    expect(mockNoteService.getNoteById).toHaveBeenCalledWith(1);
    expect(component.note).toEqual({ id: 1, title: 'Test Note' });
  });

  it('should navigate back to the list', () => {
    component.backToList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should render FontAwesome icon', () => {
    const compiled = fixture.debugElement.nativeElement;
    const iconElement = compiled.querySelector('fa-icon');
    expect(iconElement).toBeTruthy();
  });
});