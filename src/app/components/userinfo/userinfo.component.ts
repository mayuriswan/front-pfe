import { Component, ViewChild, ElementRef ,OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  @Input() user: any;
  id: number = 0;
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  role: number = 0;
  userList$!: Observable<any[]>;

  editMode: boolean = false;
  newPassword: string = "";

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
 
  isOpen = false;
 

  profilePicture: string | ArrayBuffer | null = null;
  defaultProfilePicture = 'assets/Images/user.png'; // Update the path to your default image
  constructor(private router: Router, private authService: AuthService) {}


  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  signOut(): void {
    this.authService.signOut();
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
  getRoleText(role: number): string {
    switch (role) {
      case 0:
        return 'Utilisateur normal';
      case 1:
        return 'Administrateur';
      case 2:
        return 'Superieur';
      case 3:
        return 'Evaluateur';
      default:
        return 'Unknown';
    }
  }
  getMaskedPassword(password: string): string {
    return '*'.repeat(password.length);
  }
  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      // Save changes here if needed
    }
  }

  saveChanges(): void {
    // Handle saving the new password or any other changes
    if (this.newPassword) {
      this.user.password = this.newPassword;
    }
    this.toggleEditMode();
  }
}