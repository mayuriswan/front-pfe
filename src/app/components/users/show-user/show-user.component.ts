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
  roleFilter: number | null = null;

  constructor(private service: AapApiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userList$ = this.service.getUserList().pipe(
      map(users => users.sort((a, b) => {
        const valueA = typeof a[this.sortColumn] === 'string' ? a[this.sortColumn].toLowerCase() : a[this.sortColumn];
        const valueB = typeof b[this.sortColumn] === 'string' ? b[this.sortColumn].toLowerCase() : b[this.sortColumn];
  
        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }))
    );
  
    this.userList$.subscribe(userList => {
      console.log('userList:', userList);
      let filtered = userList;
      if (this.roleFilter !== null) {
        filtered = filtered.filter(user => {
          console.log('user:', user);
          console.log('user.role:', user.role);
          console.log('this.roleFilter:', this.roleFilter);
          return this.roleFilter === null || user.role === this.roleFilter;
        });
      }
      console.log('filtered:', filtered);
      this.filteredUserList.next(filtered);
    });
  }

  filterColumn(column: string, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.userList$.subscribe(userList => {
      const filtered = userList.filter(user => {
        const value = user[column as keyof typeof user];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        } else if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
      this.filteredUserList.next(filtered);
    });
  }

  filterRole(event: Event) {
    const roleValue = parseInt((event.target as HTMLSelectElement).value, 10);
    console.log('roleValue:', roleValue);
    this.roleFilter = isNaN(roleValue) ? null : roleValue;
    console.log('this.roleFilter:', this.roleFilter);
    this.loadUsers();
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
    this.modalTitle = "Add User";
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
        return 'Evaluateur';
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