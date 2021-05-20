import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { DataService } from 'src/app/_services/dataservice';
import { CreateProductComponent } from './create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList:any = [];

  constructor(
    private dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.dataService.getAllProduct({url:'product',isLoader:true})
    .subscribe(respose =>{
      this.productList = respose;
      console.log(respose);
    });
  }

  openCreateProductDialog() {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      data:null,
      height: '700px',
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  openEditDialog(data){

    let dialogRef = this.dialog.open(CreateProductComponent, {
      data:data,
      height: '700px',
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  /**Delete Selected**/
  deleteSelectedProduct(id) {

    let message = 'Are you want delete this product?'
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '400px', data: message, disableClose: true })
       .afterClosed().subscribe(result => {
         if (result == 'YES') {
           this.deleteData(id);
         }
       });
   }
 
   deleteData(id) {

     this.dataService.delete({ url: 'product/' + id, isLoader: true })
       .subscribe((response: any) => {
        //  if(response === {}){
            // Show the success message
            this._matSnackBar.open('Product deleted successfully', 'CLOSE', {
              verticalPosition: 'bottom',
              horizontalPosition:'center',
              duration        : 2000
            });
            this.getProducts();
        //  }
      });
   }
}
