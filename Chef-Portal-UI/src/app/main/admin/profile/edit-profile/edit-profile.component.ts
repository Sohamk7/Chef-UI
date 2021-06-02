import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { ReplaySubject, Subject } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';
import { SLOTS } from 'src/app/Constants/Slots';
import { Slot } from 'src/app/_interface';
import { DataService } from 'src/app/_services/dataservice';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  message: string = '';
  editEmailForm: FormGroup;
  editPasswordForm: FormGroup;
  editPhoneNoForm: FormGroup;
  editStoreAddressForm: FormGroup;
  editBiographyForm: FormGroup;
  editCuisineForm: FormGroup
  editCollectionDeliveryForm: FormGroup;
  editCollectionForm: FormGroup;
  public slots : FormArray; 
  pwdhide: boolean = true;
  cpwdhide: boolean = true;
  public inputAccpets : string = ".jpeg, .jpg, .png";
  private file: string | null = null;
  public tmp_avatar_img;
  // public cuisineNamesList: any = [];

  /** list of cuisine */
  protected cuisineNamesList: any = [];
  public startSlotsList: Slot[] = SLOTS;
  public endSlotsList: Slot[] = [];
  public start1SlotsList: Slot[] = [];
  public end1SlotsList: Slot[] = [];
  public start2SlotsList: Slot[] = SLOTS;
  public end2SlotsList: Slot[] = [];

  /** control for the MatSelect filter keyword multi-selection */
  public cuisineMultiFilterCtrl: FormControl = new FormControl();

  /** list of cuisines filtered by search keyword */
  public filteredCuisinesMulti: ReplaySubject<[]> = new ReplaySubject<[]>(1);  
  
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _matSnackBar:MatSnackBar,
    private _dataService :DataService) {

    this.slots = this._fb.array([]); 
    
   }

  ngOnInit(): void {

    console.log(this.data)

    if(this.data.type === 'email') {
      this.message = 'Edit Chef Email';
      this.EditEmailFormGroup();
    }else if(this.data.type === 'password'){
      this.message = 'Edit Chef Password';
      this.EditPasswordFormGroup();
    }else if(this.data.type === 'phoneNo'){
      this.message = 'Edit Chef Phone Number';
      this.EditPhoneNoFormGroup();
    }else if(this.data.type === 'address'){
      this.message = 'Edit Chef Store Address';
      this.EditStoreAddressFormGroup();
    }else if(this.data.type === 'biography'){
      this.message = 'Edit Chef Biography';
      this.EditBiographyFormGroup();
    }else if(this.data.type === 'profile'){
      this.message = 'Edit Chef Profile Picture';
    }else if(this.data.type === 'banner'){
      this.message = 'Edit Chef Banner Picture';
    }else if(this.data.type === 'cuisine'){
      this.message = 'Edit Cuisine Name';
      this.EditCuisineFormGroup();
      this.getCuisineList();
      if(this.data.cuisineNames.length >0) {
        let cuisineNameToDispaly: any = [];
        this.data.cuisineNames.forEach(cuisine => {
          cuisineNameToDispaly.push(cuisine.cuisine_id);
        });
        this.editCuisineForm.controls['cuisines'].setValue(cuisineNameToDispaly)
      }
    }else if(this.data.type === 'collectionDelivery'){
      this.message = 'Edit Chef Collection/Delivery Enabled/Disabled';
      this.EditCollectionDeliveryFormGroup();
    }else if(this.data.type === 'collection'){
      this.message = 'Edit Chef Collection slots';
      this.EditCollectionFormGroup();
      this.editCollectionForm.addControl('slots', this.slots);
    }else if(this.data.type === 'delivery'){
      this.message = 'Edit Chef Delivery Slots';
      this.EditCollectionFormGroup();
      this.editCollectionForm.addControl('slots', this.slots);
    }

    // listen for search field value changes
    this.cuisineMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCuisinesMulti();
      });
  }

  onAddSelectRow() {
    console.log('dhbjhsb')
    this.slots.push(this.createItemFormGroup(null));
  }

  createItemFormGroup(data): FormGroup {
    let start = '';
    let end = '';
    console.log('in form')
    
    if(data){
      start = data.icon ? data.icon : '';
      end = data.link ? data.link : '';
    }
    return this._fb.group({
      start: this._fb.control(start),
      end: this._fb.control(end), 
    });
  }

  onRemoveRow(idx) {    
    this.slots.removeAt(idx);
  }

  /**
   * Sets the initial value after the filteredCuisines are loaded initially
   */
   protected setInitialValue() {
    this.filteredCuisinesMulti
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
    if (!this.cuisineNamesList) {
      return;
    }
    // get the search keyword
    let search = this.cuisineMultiFilterCtrl.value;
    if (!search) {
      this.filteredCuisinesMulti.next(this.cuisineNamesList.slice());
      console.log(this.filteredCuisinesMulti)
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the cuisine
    this.filteredCuisinesMulti.next(
      this.cuisineNamesList.filter(cuisine => cuisine.name.toLowerCase().indexOf(search) > -1)
    );
    console.log(this.cuisineNamesList.filter(cuisine => cuisine.name.toLowerCase().indexOf(search) > -1));
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
      let mediaInfo = new FormData();
      mediaInfo.append('chef_profile_id',this.data.profile_data.chef_profile_id);
      if(this.data.type === 'profile'){
        let message = 'Profile Picture Edited Successfully';
        mediaInfo.append('profile_picture',this.file);
        this.postAPIResponse('chef/chef_profile/profile_picture',mediaInfo,message);
      }else if(this.data.type === 'banner'){
        let message = 'Banner Picture Edited Successfully';
        mediaInfo.append('banner_picture',this.file);
        this.postAPIResponse('chef/chef_profile/banner_picture',mediaInfo,message);
      }
    }
  }

  EditEmailFormGroup() {
    this.editEmailForm = this._fb.group({
      email: this._fb.control('', [Validators.required,Validators.email])
    });
  }

  EditPasswordFormGroup() {
    this.editPasswordForm = this._fb.group({
      password: this._fb.control('', [Validators.required,Validators.minLength(8)]),
      confirm_password: this._fb.control('',[Validators.required, confirmPasswordValidator])
    });
  }

  EditPhoneNoFormGroup() {
    this.editPhoneNoForm = this._fb.group({
      phone_number: this._fb.control('', [Validators.required,Validators.pattern("^((\\+44-?)|0)?[0-9]{10}$")])
    });
  }

  EditBiographyFormGroup() {
    this.editBiographyForm = this._fb.group({
      chef_profile_id: this._fb.control(this.data.profile_data.chef_profile_id),
      biography: this._fb.control('',[Validators.required,Validators.minLength(120)])
    });
  }

  EditStoreAddressFormGroup() {
    this.editStoreAddressForm = this._fb.group({
      address_1: this._fb.control('', [Validators.required]),
      address_2: this._fb.control(''),
      address_3: this._fb.control(''),
      city: this._fb.control('', [Validators.required]),
      country: this._fb.control('', [Validators.required]),
      postcode: this._fb.control('', [Validators.required, Validators.minLength(6),Validators.maxLength(6)]),
    });
  }

  EditCuisineFormGroup() {
    this.editCuisineForm = this._fb.group({
      cuisines: this._fb.control([])
    });
  }

  EditCollectionDeliveryFormGroup() {
    let profile_data = this.data.profile_data
    this.editCollectionDeliveryForm = this._fb.group({
      chef_id: this._fb.control(0),
      collection: this._fb.control(profile_data._chef_store.collection,[Validators.required]),
      delivery: this._fb.control(profile_data._chef_store.delivery,[Validators.required])
    });
  }

  EditCollectionFormGroup() {
    this.editCollectionForm = this._fb.group({
      chef_id: this._fb.control(0),
      start: this._fb.control(''),
      end: this._fb.control(''),
      start1: this._fb.control(''),
      end1: this._fb.control(''),
    });
  }

  getCuisineList() {
    this._dataService.get({url:'cuisines/options', isLoader:true})
    .subscribe(response => {
      this.cuisineNamesList = response;
      this.filteredCuisinesMulti.next(this.cuisineNamesList.slice());
      console.log(response);
    });
  }

  emailSubmit() {
    let message = 'Email Edited Successfully';
    this.postAPIResponse('chef/details/email',this.editEmailForm.value,message);
  }

  passwordSubmit() {
    let message = 'Password Edited Successfully';
    this.postAPIResponse('chef/details/password',this.editPasswordForm.value,message);
  }

  phoneNoSubmit() {
    let message = 'Phone No Edited Successfully';
    this.postAPIResponse('chef/details/phone_number',this.editPhoneNoForm.value,message);
  }

  biographySubmit() {
    let message = 'Biography Edited Successfully';
    this.postAPIResponse('chef/chef_profile/bio',this.editBiographyForm.value,message);
  }

  storeAddressSubmit() {
    let message = 'Store Address Edited Successfully';
    this.postAPIResponse('chef/chef_store/address',this.editStoreAddressForm.value,message);
  }

  CuisineSubmit() {
    let message = 'Cuisines Edited Successfully';
    this.postAPIResponse('chef/chef_store/cuisines',this.editCuisineForm.value,message);
  }

  collectionDeliverySubmit() {
    let message = 'Collection/Delivery Edited Successfully';
    this.postAPIResponse('chef/chef_store/preference',this.editCollectionDeliveryForm.value,message);
  }

  collectionSubmit() {
    let message = this.data.type === 'collection' ? 'Collection slots Edited Successfully' : 'Delivery slots Edited Successfully';
    let url = this.data.type === 'collection' ? 'chef/chef_store/collection/slot' : 'chef/chef_store/delivery/slot';
    let formValue = this.editCollectionForm.value;
    let tmpArr: any = [{'start':formValue.start.value,'end':formValue.end.value},{'start':formValue.start1.value,'end':formValue.end1.value}];
    let slotArr = this.slots.value;
    slotArr.forEach(element => {
      let object: any = {};
      object['start'] = element.start.value;
      object['end'] = element.end.value;
      tmpArr.push(object);
    });
    console.log(tmpArr);
    console.log(this.slots);
    // let slots = tmpArr.concat(this.slots.value);
    this.postAPIResponse(url,{chef_id:0,slots:tmpArr},message);
  }

  postAPIResponse(url, value, message){

    if(this.data.type!=='profile' && this.data.type!=='banner'){

      this._dataService.save({url:url,data:value,isLoader:true})
        .pipe(first())
        .subscribe(
            data => {
                // Show the success message
                this._matSnackBar.open(message, 'CLOSE', {
                    verticalPosition: 'bottom',
                    horizontalPosition:'center',
                    duration        : 2000
                });
                this.dialogRef.close();
            },
            error => {
                // Show the error message
                this._matSnackBar.open('please try again', 'Retry', {
                    verticalPosition: 'bottom',
                    horizontalPosition:'center',
                    duration        : 2000
                });
        });
    }else{
      this._dataService.saveMedia({url:url,data:value,isLoader:true})
        .pipe(first())
        .subscribe(
            data => {
                // Show the success message
                this._matSnackBar.open(message, 'CLOSE', {
                    verticalPosition: 'bottom',
                    horizontalPosition:'center',
                    duration        : 2000
                });
                this.dialogRef.close();
            },
            error => {
                // Show the error message
                this._matSnackBar.open('please try again', 'Retry', {
                    verticalPosition: 'bottom',
                    horizontalPosition:'center',
                    duration        : 2000
                });
        });
    }
  }

  RemovePicture() {
    this.tmp_avatar_img = '';
  }

  startSlotsChange(event) {
    this.endSlotsList = [];
    this.start1SlotsList = [];
    this.end1SlotsList = [];
    let index = this.startSlotsList.findIndex((x => x === event.value));

    if(index!==-1){
      for(let i=index + 5;i<this.startSlotsList.length;i++){
        this.endSlotsList.push(this.startSlotsList[i]);
      }
    }
  }

  endSlotsChange(event) {
    console.log('end');
    this.start1SlotsList = [];
    this.end1SlotsList = [];
    let index = this.startSlotsList.findIndex((x => x === event.value));
    if(index!==-1){
      for(let i=index ;i<this.startSlotsList.length;i++){
        this.start1SlotsList.push(this.startSlotsList[i]);
      }
    }
  }

  start1SlotsChange(event) {
    this.end1SlotsList = [];
    let index = this.startSlotsList.findIndex((x => x === event.value));

    if(index!==-1){
      for(let i=index + 1;i<this.startSlotsList.length;i++){
        this.end1SlotsList.push(this.startSlotsList[i]);
      }
    }
  }

  start2SlotsChange(event) {
    let index = this.startSlotsList.findIndex((x => x === event.value));

    let tmpArr: any = [];

    if(index!==-1){
      for(let i=index + 5;i<this.startSlotsList.length;i++){
        tmpArr.push(this.startSlotsList[i]);
      }
      this.end2SlotsList = tmpArr;
    }
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
 export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirm_password');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ((password && password.value && password.value.trim()) === (passwordConfirm && passwordConfirm.value && passwordConfirm.value.trim()))
  {
      return null;
  }

  return {passwordsNotMatching: true};
};


