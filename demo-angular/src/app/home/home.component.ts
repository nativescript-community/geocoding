import { Component, OnInit } from "@angular/core";
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import * as geocoding from 'nativescript-geocoding';
;

@Component({
    moduleId: module.id,
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public searchString = '';
    public location = new geocoding.Location();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        geocoding.getLocationFromName(searchBar.text).then(loc => {
            this.location = loc;
            // console.log('Found ', loc);
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
    public onSearchBarClear(args) {
        this.location = new geocoding.Location();
    }

}
