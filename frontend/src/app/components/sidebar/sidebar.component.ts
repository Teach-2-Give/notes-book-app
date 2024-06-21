import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStickyNote, faUser, faTrash, faSignOutAlt, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faStickyNote = faStickyNote;
  faUser = faUser;
  faTrash = faTrash;
  faSignOutAlt = faSignOutAlt;
  faQuestionCircle = faQuestionCircle;
  faCog = faCog;
}