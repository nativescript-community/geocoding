import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import * as geocoding from '@nativescript-community/geocoding';
import { SearchBar } from '@nativescript/core';

@Component({
    selector: 'ns-demo1',
    templateUrl: './demo1.component.html'
})
export class Demo1Component implements OnInit {
    constructor(private router: RouterExtensions) {}

    ngOnInit(): void {}

    goBack(): void {
        this.router.back();
    }
    public searchString = '';
    public location = new geocoding.Location();

    public onSubmit(args) {
        const searchBar = args.object as SearchBar;
        geocoding.getLocationListFromName(searchBar.text, 5).then(
            (locations) => {
                console.log('Found ', locations.length);
                if (locations.length > 0) {
                    this.location = locations[0];
                }
            },
            function (e) {
                console.log('Error: ' + (e.message || e));
            }
        );
    }

    public onSearchBarClear(args) {
        this.location = new geocoding.Location();
    }
}
