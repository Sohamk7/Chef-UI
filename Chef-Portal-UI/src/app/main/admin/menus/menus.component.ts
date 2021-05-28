import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { DataService } from 'src/app/_services/dataservice';
import { CreateMenuComponent } from './create-menu/create-menu.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  menuList:any = [];

  constructor(
    private dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {

    this.dataService.getAll({url:'menu',isLoader:true})
    .subscribe(response =>{
      this.menuList = response;
      console.log(response);
    });
  }

  openCreateMenuDialog() {
    let dialogRef = this.dialog.open(CreateMenuComponent, {
      data:null,
      height: '700px',
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMenus();
    });
  }

  openEditDialog(data){

    let dialogRef = this.dialog.open(CreateMenuComponent, {
      data: data,
      height: '700px',
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMenus();
    });
  }

  /**Delete Selected**/
  deleteSelectedMenu(id) {

    let message = 'Are you want delete this Menu?'
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '400px', data: message, disableClose: true })
       .afterClosed().subscribe(result => {
         if (result == 'YES') {
           this.deleteData(id);
         }
       });
   }
 
   deleteData(id) {

     this.dataService.delete({ url: 'menu/delete/' + id, isLoader: true })
       .subscribe((response: any) => {
        //  if(response === {}){
            // Show the success message
            this._matSnackBar.open('Menu deleted successfully', 'CLOSE', {
              verticalPosition: 'bottom',
              horizontalPosition:'center',
              duration        : 2000
            });
            this.getMenus();
        //  }
      });
   }
}
