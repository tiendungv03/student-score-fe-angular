import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientApiService } from '../../../core/services/http-client-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  imports: [CommonModule, FormsModule],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionsComponent {
  dataApi: any[] = [];
  filteredData: any[] = [];
  searchText = '';

  constructor(
    private httpApi: HttpClientApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.httpApi.getPermissions().subscribe({
      next: (data) => {
        // console.log('data api: ' + data);
        // const tamp: any = data;
        // console.log('data api:', JSON.stringify(data, null, 2));
        this.dataApi = data;

        this.filteredData = [...this.dataApi];
        // console.log('dtf: ' + this.filteredData);
        // console.log('dtf: ' + JSON.stringify(this.filteredData, null, 2));
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.snackBar.open('Failed to load accounts', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  filterData() {
    const text = this.searchText.toLowerCase();
    this.filteredData = this.dataApi.filter(
      (item: any) =>
        item.taiKhoan?.tenDangNhap?.toLowerCase().includes(text) ||
        item.tenQuyen?.toLowerCase().includes(text)
    );
  }
}
