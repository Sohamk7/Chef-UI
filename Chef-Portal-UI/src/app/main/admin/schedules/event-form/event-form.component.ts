import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarEvent } from 'angular-calendar';
import { MatColors } from 'src/app/mat-colors';
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
  presetColors = MatColors.presets;
  startDate = new Date();
  menuList: any = [];

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
      // this.event = _data.event;
      // this.action = _data.action;

      // if ( this.action === 'edit' )
      // {
      //     this.dialogTitle = this.event.title;
      // }
      // else
      // {
      //     this.dialogTitle = 'New Event';
      //     this.event = new CalendarEventModel({
      //         start: _data.date,
      //         end  : _data.date
      //     });
      // }

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
      return new FormGroup({
          chef_id : new FormControl(0),
          menu_id : new FormControl('',[Validators.required]),
          available_date   : new FormControl('',[Validators.required]),
          public : new FormControl(true,[Validators.required]),
      });
  }

  onClickAdd() {
    if (this.eventForm.invalid) {
      return;
    }
    let formValue = this.eventForm.value;
    //Define formdata
    let message = this._data!==null ? 'Schedule Edited successfully' : 'Schedule created successfully';
    let url = this._data!==null ? 'schedule/update' : 'schedule/create';
    
    this._dataService.save({url: url, data:formValue})
      .subscribe(uploadResponse=>{
        console.log(uploadResponse);
        this.matDialogRef.close();
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
}
