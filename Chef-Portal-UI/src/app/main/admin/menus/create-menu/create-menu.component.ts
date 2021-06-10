import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect; 
  createManuForm:FormGroup;
  // productsList: any = [];
  public message:string = '';
  /** list of cuisine */
  protected productsList: any = [];

  /** control for the MatSelect filter keyword multi-selection */
  public productMultiFilterCtrl: FormControl = new FormControl();

  /** list of cuisines filtered by search keyword */
  public filteredProductsMulti: ReplaySubject<[]> = new ReplaySubject<[]>(1);  
  
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    public dialogRef                      : MatDialogRef<CreateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private dataService :DataService) { 
    this.getProducts();
  }

  ngOnInit(): void {

    if(this.data!==null){

      this.message = 'Edit Menu';
      let menu_details = this.data;

      this.createManuForm = this._fb.group({
        name: this._fb.control(menu_details.name,[Validators.required, Validators.minLength(5)]),
        description: this._fb.control(menu_details.description,[Validators.required, Validators.minLength(15)]),
        products: this._fb.control([], [Validators.required]),
        chef_id: this._fb.control(0),
        menu_id: this._fb.control(menu_details.id)
      });

      let productNameToDispaly: any = []; 
      menu_details._products.forEach(product => {
        productNameToDispaly.push(product.product_id);
      });
      this.createManuForm.controls['products'].setValue(productNameToDispaly)
    }else{

      this.message = 'Create Menu';

      this.createManuForm = this._fb.group({
        name: this._fb.control('',[Validators.required, Validators.minLength(5)]),
        description: this._fb.control('',[Validators.required, Validators.minLength(15)]),
        products: this._fb.control([], [Validators.required]),
        chef_id:this._fb.control(0),
      });
    }

    // listen for search field value changes
    this.productMultiFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCuisinesMulti();
    });
  }

  /**
   * Sets the initial value after the filteredCuisines are loaded initially
   */
   protected setInitialValue() {
    this.filteredProductsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a, b) => a && b && a.id === b.id;
      });
  }

  protected filterCuisinesMulti() {
    if (!this.productsList) {
      return;
    }
    // get the search keyword
    let search = this.productMultiFilterCtrl.value;
    if (!search) {
      this.filteredProductsMulti.next(this.productsList.slice());
      console.log(this.filteredProductsMulti)
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cuisine
    this.filteredProductsMulti.next(
      this.productsList.filter(cuisine => cuisine._product_details.name.toLowerCase().indexOf(search) > -1)
    );
    console.log(this.productsList.filter(cuisine => cuisine._product_details.name.toLowerCase().indexOf(search) > -1));
  }


  getProducts() {

    this.dataService.getAll({url:'product',isLoader:true})
    .subscribe(response =>{
      this.productsList = response;
      this.filteredProductsMulti.next(this.productsList.slice());
    });
  }
  
  onSubmit() {

    if (this.createManuForm.invalid) {
      return;
    }
    let formValue = this.createManuForm.value;
    //Define formdata
    let message = this.data!==null ? 'Menu Edited successfully' : 'Menu created successfully';
    let url = this.data!==null ? 'menu/update' : 'menu/create';
    
    this.dataService.save({url: url, data:formValue})
      .subscribe(uploadResponse=>{
        console.log(uploadResponse);
        this.dialogRef.close();
        // Show the success message
        this._matSnackBar.open(message, 'CLOSE', {
          verticalPosition: 'bottom',
          horizontalPosition:'center',
          duration        : 2000
      });
    },
    error => {
       // Show the error message
        this._matSnackBar.open(error.error.message, 'RETRY', {
          verticalPosition: 'bottom',
          horizontalPosition:'center',
          duration        : 2000
      });
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }  
}

