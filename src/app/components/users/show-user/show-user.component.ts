import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AapApiService } from 'src/app/services/aap-api.service';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit{

  userList$!:Observable<any[]>;




  constructor(private service:AapApiService) { }


  ngOnInit(): void {
    this.userList$ = this.service.getUserList();
  }

  modalTitle:string = '';
  activateAddEditUserComponent:boolean = false;
  user:any;

  modalAdd(){
    this.user = {
      id:0,
      firstname:null,
      lastname:null,
      email:null,
      password:null,
      phone:null,
      role:null
    }
    this.modalTitle = "Ajouter un utilisateur";
    this.activateAddEditUserComponent = true;
  }

  modalClose() {
    this.activateAddEditUserComponent = false;
    this.userList$ = this.service.getUserList();
  }
  getRoleName(role: number): string {
    switch (role) {
      case 0:
        return 'utilisateur normale';
      case 1:
        return 'admin';
      case 2:
        return 'superieur';
      default:
        return 'unknown';
    }
  }


}
