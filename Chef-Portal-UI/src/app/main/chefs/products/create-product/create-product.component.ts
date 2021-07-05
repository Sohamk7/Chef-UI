import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonUtils } from 'src/app/_helpers/common.utils';
import { DataService } from 'src/app/_services/dataservice';
import { AddProductVarientsComponent } from './add-product-varients/add-product-varients.component';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect; 
  createProductForm:FormGroup;
  public inputAccpets : string = ".jpeg, .jpg, .png";
  private file: string | null = null;
  public tmp_avatar_img;
  public message:string = '';
  protected _onDestroy = new Subject<void>();
  public isSubmit: boolean = false;
  public loader = false;
  public showLoader: boolean = true;
  public allergenList: any = [];
  public dietaryList: any = [];
  public productVarientList: any = [];
  public maxSelection:number = 0;
  public singleSelection: boolean = false;

  public AllergyMultiFilterCtrl: FormControl = new FormControl();
  public DietaryMultiFilterCtrl: FormControl = new FormControl();

  public varient_category: FormArray;	

  public filteredAllergyMulti: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  public filteredDietaryMulti: ReplaySubject<[]> = new ReplaySubject<[]>(1);

  constructor(
    public dialogRef                      : MatDialogRef<CreateProductComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data  : any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private dataService :DataService,
    private currencyPipe : CurrencyPipe,
  ) { 
    this.getAllergen();
    this.getDietaries();
    this.varient_category = this._fb.array([]);
  }

  ngOnInit(): void {

    console.log(this.data);
  
    // this.getProducts();

    if(this.data!==null){

      this.message = 'Edit Product';
      let product_details = this.data._product_details;

      this.createProductForm = this._fb.group({
        name: this._fb.control(product_details.name,[Validators.required]),
        price: this._fb.control(product_details.price,[Validators.required,Validators.pattern("^[0-9]*$")]),
        description: this._fb.control(product_details.description,[Validators.required]),
        allergense: this._fb.control([], [Validators.required]),
        dietaries: this._fb.control([], [Validators.required]),
        varients: this._fb.control([], [Validators.required]),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('')
      });

      let allergenNameToDispaly: any = []; 
      product_details._allergens.forEach(allergen => {
        allergenNameToDispaly.push(allergen.allergen_id);
      });

      
      let dietaryNameToDispaly: any = []; 
      product_details._dietaries.forEach(dietary => {
        dietaryNameToDispaly.push(dietary.dietary_id);
      });

      this.tmp_avatar_img = product_details._product_media_of_product_details.media_url.url;

    }else{

      this.message = 'Create New Product';

      this.createProductForm = this._fb.group({
        name: this._fb.control('',[Validators.required]),
        price: this._fb.control('',[Validators.required,Validators.pattern("^[0-9]*$")]),
        description: this._fb.control('',[Validators.required]),
        allergense: this._fb.control([], [Validators.required]),
        dietaries: this._fb.control([], [Validators.required]),
        varients: this._fb.control([], [Validators.required]),
        chef_id:this._fb.control(1),
        product_image: this._fb.control('',[Validators.required])
      });
    }
    this.AllergyMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterAllergenMulti();
      });

      this.DietaryMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtereDietaryMulti();
      });
    
    this.createProductForm.addControl('varient_category', this.varient_category); 
  }

  protected setInitialValue() {
    this.filteredAllergyMulti
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

  protected setInitialValue1() {
    this.filteredDietaryMulti
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

  
  protected filterAllergenMulti() {
    if (!this.allergenList) {
      return;
    }
    // get the search keyword
    let search = this.AllergyMultiFilterCtrl.value;
    if (!search) {
      this.filteredAllergyMulti.next(this.allergenList.slice());
      console.log(this.filteredAllergyMulti)
      return;
    } else { 
      search = search.toLowerCase();
    }
    // filter the cuisine
    this.filteredAllergyMulti.next(
      this.allergenList.filter(allergense => allergense.allergen_name.toLowerCase().indexOf(search) > -1)
    );
    console.log(this.allergenList.filter(allergense =>allergense.allergen_name.toLowerCase().indexOf(search) > -1));
  }

  protected filtereDietaryMulti() {
    if (!this.allergenList) {
      return;
    }
    // get the search keyword
    let search = this.DietaryMultiFilterCtrl.value;
    if (!search) {
      this.filteredDietaryMulti.next(this.dietaryList.slice());
      console.log(this.filtereDietaryMulti)
      return;
    } else { 
      search = search.toLowerCase();
    }
    // filter the cuisine
    this.filteredDietaryMulti.next(
      this.dietaryList.filter(dietary => dietary.dietary_name.toLowerCase().indexOf(search) > -1)
    );
    console.log(this.dietaryList.filter(dietary =>dietary.dietary_name.toLowerCase().indexOf(search) > -1));
  }

  // getProducts() {

  //   this.dataService.getAll({url:'product',isLoader:true})
  //   .subscribe(response =>{
  //     this.productVarientList = response;
  //   });
  // }

  // getmappedList(data) {
  //   let tempArr = [];
  //   data.forEach(element => {
  //       let obj = {};
  //       obj['product_id'] = element.id;
  //       obj['name'] = element._product_details?.name;
  //       obj['price'] = element._product_details?.price;
  //       tempArr.push(obj);
  //   });
  //   return tempArr;
  // }

  transformAmount(element){
    let formattedAmount = this.currencyPipe.transform(this.createProductForm.get('price').value, 'EUR');

    element.target.value = formattedAmount;
  }
  
  fileChangeEvent(event: any): void {
    const file = event && event.target.files[0] || null;
    this.getBase64(event.target.files[0]);
  }


  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.file = event.target.result;
      this.tmp_avatar_img = event.target.result;
    }
  }

  

  getAllergen() {

    this.dataService.getAllergensDietaries({url:'product/allergen_info',isLoader:true})
    .subscribe(response =>{
      this.allergenList = response;
      this.filteredAllergyMulti.next(this.allergenList.slice());
      this.showLoader = false;
      console.log(this.allergenList);
    });
  }

  getDietaries() {

    this.dataService.getAllergensDietaries({url:'product/dietary_info',isLoader:true})
    .subscribe(response =>{
      this.dietaryList = response;
      this.filteredDietaryMulti.next(this.dietaryList.slice());
      this.showLoader = false;
      console.log(this.dietaryList);
    });
  }

  onSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    if (this.createProductForm.valid) {
      this.loader = true;
      let formValue = this.createProductForm.value;
      this.isSubmit = true;
      //Define formdata
      let mediaInfo = new FormData();
      let message = this.data!==null ? 'Product Edited successfully' : 'Product created successfully';
      let url = this.data!==null ? 'product/' + this.data.id : 'product/create';
      if(this.data!==null){
        mediaInfo.append('product_id',this.data.id);
      }

      if(this.file!== null) {
        mediaInfo.append('product_media',this.file);
      }
    
      mediaInfo.append('name',formValue.name);
      mediaInfo.append('price',formValue.price);
      mediaInfo.append('description',formValue.description);
      mediaInfo.append('vegetarian',formValue.vegetarian);
      mediaInfo.append('chef_id',formValue.chef_id);
      
    
      this.dataService.saveMedia({url: url,data:mediaInfo, isLoader:true})
        .subscribe(uploadResponse=>{
          console.log(uploadResponse);
          
          // Show the success message
          this._matSnackBar.open(message, 'CLOSE', {
            verticalPosition: 'bottom',
            horizontalPosition:'center',
            duration        : 2000
        });
        this.dialogRef.close();
        this.isSubmit = false;
      },
      error => {
        // Show the error message
          this.loader = false;
          this.isSubmit = false;
          this._matSnackBar.open(error.message, 'RETRY', {
            verticalPosition: 'bottom',
            horizontalPosition:'center',
            duration        : 2000
        });
      });
    }else{
      CommonUtils.validateAllFormFields(this.createProductForm);
    }
  }

  RemovePicture() {
    this.tmp_avatar_img = '';
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  
  addEditVarient(data,type){
    let dialogRef = this.dialog.open(AddProductVarientsComponent, {
      data:{'type':type,rowdata:data},
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=='N'){
        
        if(result.type === 'add'){

          result.rowdata.id = this.productVarientList.length + 1;
          this.productVarientList.push(result.rowdata);
        }else if(result.type === 'edit'){

          this.productVarientList.forEach((item, index) => {
              if(item.id === result.rowdata.id){
                this.productVarientList[index] = result.rowdata;
              }
            });
        }

      }
    });
  }

  deleteVarient(idx){
    this.productVarientList.splice(idx, 1);
  }

  toggleChangeValue(event,i) {
    this.productVarientList[i].default = event.checked;
    // this.checkSingleorMaxSelection();
  }

  changeSingleSelection(event) {
    this.singleSelection = event.checked;
  }

  addNewVarientCategory() {

    let dialogRef = this.dialog.open(AddProductVarientsComponent, {
      data:{'type':'var_cat',rowdata:null},
      width: '600px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=='N'){
        
        this.varient_category.push(this.createItemFormGroup(result.rowdata));  
        console.log(this.varient_category);
      }
    });


  }

  createItemFormGroup(data): FormGroup {      
		return this._fb.group({
		   name : this._fb.control(data.name, Validators.required), 
		});
	}

  onRemoveRow(idx) {    
		this.varient_category.removeAt(idx);
	}
  
  // checkSingleorMaxSelection(){
  //   this.maxSelection = 0;
  //   if(this.productVarientList.length > 0){
  //     this.productVarientList.forEach(element => {
  //       if(element.default===true){
  //         console.log(element.default);
  //         this.maxSelection = this.maxSelection + 1;
  //       }
  //     });
  //     console.log(this.maxSelection);
  //     this.singleSelection = this.maxSelection === 1 ? true : false;
  //     console.log(this.singleSelection);
  //   }
  // }

}
