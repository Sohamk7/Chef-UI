import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarEvent } from 'angular-calendar';
// import { MatColors } from 'src/app/mat-colors';
import { CalendarEventModel } from 'src/app/_models/event.model';
import { DataService } from 'src/app/_services/dataservice';
import { MenuService } from 'src/app/_services/menu.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class CalendarEventFormDialogComponent implements OnInit {

  action: string;
  event: CalendarEvent;
  eventForm: FormGroup;
  dialogTitle: string = 'New Event';
  // presetColors = MatColors.presets;
  startDate = new Date().setDate(new Date().getDate() + 1);
  endDate =  new Date().setDate(new Date().getDate() + 28);
  menuList: any = [];
  public isSubmit: boolean = false;
  public loader: boolean = false;

  /**
   * Constructor
   *
   * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: any,
      private _formBuilder: FormBuilder,
      private _manuService: MenuService,
      private _matSnackBar:MatSnackBar,
      private _dataService: DataService
  )
  {
    // console.log(new Date().getDate()+28);
    console.log(this._data);
      // this.event = _data.event;
      // this.action = _data.action;

      if ( this._data)
      {
          this.dialogTitle = 'Edit Event';
      }
      else
      {
          this.dialogTitle = 'New Event';
      }

      this.eventForm = this.createEventForm();
  }
  ngOnInit() {
    this.getMenus();
  }

  getMenus(): void
  {
    this._dataService.getAll({url:'menu',isLoader:true})
      .subscribe(respose => {
        this.menuList = respose;
      })
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create the event form
   *
   * @returns {FormGroup}
   */
  createEventForm(): FormGroup
  {
      if(this._data){
        let chef_id = this._data._product_menu ? this._data._product_menu.chef_id : 0;
        let menu_id = this._data._product_menu ? this._data._product_menu.id : 0;
        let available_date = this._data.available_date ? new Date(this._data.available_date) : new Date();
        let ispublic = this._data.public ? this._data.public : true;
        let availability_id = this._data.id ? this._data.id : 0;
        return new FormGroup({
          chef_id : new FormControl(chef_id),
          menu_id : new FormControl(menu_id,[Validators.required]),
          available_date   : new FormControl(available_date,[Validators.required]),
          public : new FormControl(ispublic,[Validators.required]),
          availability_id: new FormControl(availability_id)
        });
      }else {
        return new FormGroup({
          chef_id : new FormControl(0),
          menu_id : new FormControl(0,[Validators.required]),
          available_date   : new FormControl(new Date(),[Validators.required]),
          public : new FormControl(true,[Validators.required]),
        });
      }
  }

  onClickAdd(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.eventForm.valid) {
      
      let formValue = this.eventForm.value;
      this.isSubmit = true;
      this.loader = true;
      //Define formdata
      let message = this._data!==null ? 'Schedule Edited successfully' : 'Schedule created successfully';
      let url = this._data!==null ? 'schedule/update' : 'schedule/create';
      
      this._dataService.save({url: url, data:formValue,isLoader:true})
        .subscribe(uploadResponse=>{
          console.log(uploadResponse);
          this.matDialogRef.close();
          this.isSubmit = false;
          // Show the success message
          this._matSnackBar.open(message, 'CLOSE', {
            verticalPosition: 'bottom',
            horizontalPosition:'center',
            duration        : 2000
        });
      },
      error => {
        // Show the error message
          this.loader = false;
          this.isSubmit = false;
          this._matSnackBar.open(error.error.message, 'RETRY', {
            verticalPosition: 'bottom',
            horizontalPosition:'center',
            duration        : 2000
        });
      });
    }
    
  }
}
