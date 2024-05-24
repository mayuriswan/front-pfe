import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AapApiService } from 'src/app/services/aap-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  userList$!: Observable<any[]>;
  filteredUserList = new BehaviorSubject<any[]>([]);
  pageSize = 10;
  currentPage = 1;
  sortColumn: string = 'lastname';
  sortDirection: string = 'asc';

  constructor(private service: AapApiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userList$ = this.service.getUserList().pipe(
      map(users => users.sort((a, b) => this.sortDirection === 'asc' ? a[this.sortColumn].localeCompare(b[this.sortColumn]) : b[this.sortColumn].localeCompare(a[this.sortColumn])))
    );
    this.updateFilteredUserList();
  }

  updateFilteredUserList() {
    this.userList$.subscribe(userList => {
      this.filteredUserList.next(userList);
    });
  }

  filterColumn(column: string, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.userList$.subscribe(userList => {
      const filtered = userList.filter(user => {
        const value = user[column as keyof typeof user];
        if (column === 'role') {
          // Special case for filtering role
          return this.getRoleName(value).toLowerCase().includes(searchTerm);
        } else if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        } else if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
      this.filteredUserList.next(filtered);
    });
  }

  sortByColumn(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadUsers();
  }

  modalTitle: string = '';
  activateAddEditUserComponent: boolean = false;
  user: any;

  modalEdit(item: any) {
    this.user = item;
    this.modalTitle = "Edit User";
    this.activateAddEditUserComponent = true;
  }

  modalAdd() {
    this.user = {
      id: 0,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      phone: null,
      role: null
    }
    this.modalTitle = "Ajouter un utilisateur";
    this.activateAddEditUserComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete User ${item.id}`)) {
      this.service.deleteUser(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none"
          }
        }, 4000);
        this.loadUsers();
      })
    }
  }

  modalClose() {
    this.activateAddEditUserComponent = false;
    this.loadUsers();
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

  generateArray(length: number) {
    return Array.from({ length }, (_, i) => i + 1);
  }
}