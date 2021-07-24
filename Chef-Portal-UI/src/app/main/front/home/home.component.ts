import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // var map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }
  constructor() { 

    // var defaultBounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(-33.8902, 151.1759),
    //   new google.maps.LatLng(-33.8474, 151.2631));
    
    // let input = document.getElementById('searchTextField');
    
    // var searchBox = new google.maps.places.SearchBox(input, {
    //   bounds: defaultBounds
    // });

  //   const center = { lat: 50.064192, lng: -130.605469 };
  //   // Create a bounding box with sides ~10km away from the center point
  //   const defaultBounds = {
  //     north: center.lat + 0.1,
  //     south: center.lat - 0.1,
  //     east: center.lng + 0.1,
  //     west: center.lng - 0.1,
  //   };
  //   const input = document.getElementById("searchTextField") as HTMLInputElement;
  //   const options = {
  //     bounds: defaultBounds,
  //     componentRestrictions: { country: "us" },
  //     fields: ["address_components", "geometry", "icon", "name"],
  //     strictBounds: false,
  //     types: ["establishment"],
  //   };

  //  const autocomplete = new google.maps.places.Autocomplete(input, options);

  }

  ngOnInit(): void {
  }

}
