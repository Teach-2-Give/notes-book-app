import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });
    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notes', () => {
    const dummyNotes = [
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' }
    ];

    service.getAllNotes().subscribe(notes => {
      expect(notes.length).toBe(2);
      expect(notes).toEqual(dummyNotes);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyNotes);
  });

  it('should fetch a note by ID', () => {
    const dummyNote = { id: 1, title: 'Note 1', content: 'Content 1' };

    service.getNoteById(1).subscribe(note => {
      expect(note).toEqual(dummyNote);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyNote);
  });

  it('should create a new note', () => {
    const newNote = { title: 'New Note', content: 'New Content' };

    service.createNote(newNote).subscribe(note => {
      expect(note).toEqual(newNote);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes');
    expect(req.request.method).toBe('POST');
    req.flush(newNote);
  });

  it('should update a note by ID', () => {
    const updatedNote = { id: 1, title: 'Updated Note', content: 'Updated Content' };

    service.updateNoteById(1, updatedNote).subscribe(note => {
      expect(note).toEqual(updatedNote);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedNote);
  });

  it('should delete a note by ID', () => {
    service.deleteNoteById(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/notes/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});