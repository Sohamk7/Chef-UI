import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerURL } from 'src/app/_helpers';
import { DataService } from 'src/app/_services/dataservice';

export interface ImageData{
  image: string;
  thumbImage: string;
  name: string;
}

@Component({
  selector: 'app-view-chefs',
  templateUrl: './view-chefs.component.html',
  styleUrls: ['./view-chefs.component.scss']
})
export class ViewChefsComponent implements OnInit {

  @ViewChild('nav') slider: ViewChefsComponent;
  imageObject = [];
  public productList: any = [];
  public allChefsList: any = [];
  public allCuisinesList: any = [];
  public todaysDate: Date = new Date();

  constructor(
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllChefs();
    this.getAllCuisines();
  }

  getAllChefs() {

    let data = {user_location: {lat:23,lng:21}}
    this.dataService.getAllList({url: 'chef/get_list', data: data ,isLoader:true})
    .subscribe(response =>{
      let res = response as any;
      this.allChefsList = res.payload;
      this.productList = res.payload;
    });
  }

  getAllCuisines() {

    this.dataService.get({url: ServerURL.SERVER_URL_ENDPOINT + 'cuisines/options', isLoader:true})
    .subscribe(response =>{
      this.allCuisinesList = response;
      this.getJsonImageWithName(response);
      console.log(this.imageObject);
    });
  }

  getJsonImageWithName(data) {
    // let responseTempArr: any = dat;
    let ImageTempArr: any = [];

    data.forEach(element => {
      let obj:any = {};
      obj.image = element.image ? element.image.url : '';
      obj.thumbImage = element.image ? element.image.url : '';
      obj.title = element.name;
      ImageTempArr.push(obj);
    });

    this.imageObject = ImageTempArr;
    // return ImageTempArr;
  }

//   prevImageClick() {
//     this.slider.prev();
//  }

// nextImageClick() {
//     this.slider.next();
//  }
}
