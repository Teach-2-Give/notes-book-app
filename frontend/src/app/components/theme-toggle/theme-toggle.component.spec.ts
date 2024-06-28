import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, faPalette } from '@fortawesome/free-solid-svg-icons';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const body = document.body;


    expect(component.isDarkMode).toBeFalse();
    expect(body.classList).not.toContain('dark-mode');


    component.toggleDarkMode();
    fixture.detectChanges();
    expect(component.isDarkMode).toBeTrue();
    expect(body.classList).toContain('dark-mode');


    component.toggleDarkMode();
    fixture.detectChanges();
    expect(component.isDarkMode).toBeFalse();
    expect(body.classList).not.toContain('dark-mode');
  });

  it('should toggle color palette visibility', () => {

    expect(component.isColorPaletteVisible).toBeFalse();

    /**
     * Toggle color palette on
     */
    component.toggleColorPalette();
    fixture.detectChanges();
    expect(component.isColorPaletteVisible).toBeTrue();

    /**
     * Toggle color palette off
     */
    component.toggleColorPalette();
    fixture.detectChanges();
    expect(component.isColorPaletteVisible).toBeFalse();
  });

  it('should set color theme and hide color palette', () => {
    const color = '#ff0000';

    /**
     * Set color theme
     */
    component.setColorTheme(color);
    fixture.detectChanges();

    /**
     *Check if the primary color is set
     */
    expect(getComputedStyle(document.documentElement).getPropertyValue('--primary-color')).toBe(color);
    expect(component.isColorPaletteVisible).toBeFalse();
  });
});