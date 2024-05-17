import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profilePicture: string | ArrayBuffer | null = null;
  defaultProfilePicture = 'assets/Images/user.png'; // Update the path to your default image

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
}
