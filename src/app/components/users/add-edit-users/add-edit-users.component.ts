import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AapApiService

 } from 'src/app/services/aap-api.service';
@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit{

  @Input() user:any;
  id:number = 0;
  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";
  phone:string = "";
  role:number = 0;
  
  userList$!:Observable<any[]>;


  constructor(private service:AapApiService) {}

  ngOnInit(): void {
    this.userList$ = this.service.getUserList();
    this.id = this.user.id;
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.phone = this.user.phone;
    this.email = this.user.email;
    this.password = this.user.id > 0 ? '' : this.user.password;
    this.role = this.user.role;
  }

  addUser(){
    var user = {
      firstname:this.firstname,
      lastname:this.lastname,
      phone:this.phone,
      email:this.email,
      password:this.password,
      role:this.role
    }
    this.service.addUser(user).subscribe(res=> {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateUser() {
    var user = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: this.role
    }
    var id: number = this.id;
    this.service.updateUser(id, user).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
  
      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }
}