import { Component, OnInit } from "@angular/core";
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import * as geocoding from 'nativescript-geocoding';
;

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public searchString = '';
    public location = new geocoding.Location();
    public name = '';
    public zip = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let that = this;
        geocoding.getLocationFromName(searchBar.text).then(function (loc) {
            that.location = loc;
            console.log('Found ', loc);
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }

}
