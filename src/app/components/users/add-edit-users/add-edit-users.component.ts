import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {

  @Input() user: any;
  id: number = 0;
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  role: number = 0;

  userList$!: Observable<any[]>;

  constructor(private service: AapApiService) {}

  ngOnInit(): void {
    this.userList$ = this.service.getUserList();
    if (this.user) {
      this.id = this.user.id;
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.phone = this.user.phone;
      this.email = this.user.email;
      this.password = this.user.id > 0 ? '' : this.user.password;
      this.role = this.user.role;
    }
  }

  addUser() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: this.role
    };
    this.service.addUser(user).subscribe(res => {
      const closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      const showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(() => {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    });
  }

  updateUser() {
    const user = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: this.role
    };
    const id: number = this.id;
    this.service.updateUser(id, user).subscribe(res => {
      const closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      const showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(() => {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    });
  }
}
