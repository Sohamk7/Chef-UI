import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.dataService.getAllProduct({url:'product',isLoader:true})
    .subscribe(respose =>{
      this.productList = respose;
      console.log(respose);
    })
  }

  openCreateProductDialog() {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      height: '700px',
      width: '600px',
      disableClose:true
    });
  }

}
