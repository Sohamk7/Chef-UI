import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateProductDialog() {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      height: '700px',
      width: '600px',
      disableClose:true
    });
  }

}
