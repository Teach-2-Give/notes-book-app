import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, SidebarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

//   it('should render FontAwesome icons', () => {
//     const icons = [
//       'fa-sticky-note',
//       'fa-user',
//       'fa-trash',
//       'fa-sign-out-alt',
//       'fa-question-circle',
//       'fa-cog'
//     ];

//     icons.forEach(icon => {
//       const iconElement = fixture.debugElement.nativeElement.querySelector(`.${icon}`);
//       expect(iconElement).toBeTruthy();
//     });
//   });
// });
});