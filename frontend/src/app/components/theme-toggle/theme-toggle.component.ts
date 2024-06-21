import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, faPalette } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  faMoon = faMoon;
  faSun = faSun;
  faPalette = faPalette;
  isDarkMode = false;
  isColorPaletteVisible = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleColorPalette() {
    this.isColorPaletteVisible = !this.isColorPaletteVisible;
  }

  setColorTheme(color: string) {
    document.documentElement.style.setProperty('--primary-color', color);
    this.isColorPaletteVisible = false;
  }
}