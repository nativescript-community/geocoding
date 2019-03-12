import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Page } from "tns-core-modules/ui/page";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import * as geocoding from 'nativescript-geocoding';

export function onNavigatingTo(args) {
    const page: Page = <Page>args.object;
    const vm = new Observable();
    const location = new geocoding.Location();
    vm.set("location", location);
    page.bindingContext = vm;
}
// search for country
export function onSubmit(args) {
    const searchBar: SearchBar = <SearchBar>args.object;
    const searchValue = searchBar.text.toLowerCase();
    const page: Page = <Page>searchBar.page;
    const vm = page.bindingContext;

    const myItems = new ObservableArray();
    if (searchValue !== "") {
        geocoding.getLocationFromName(searchValue).then(loc => {
            vm.set("location", loc);
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
}
// clear SearchBar text and load ListView initial data
export function onClear(args) {
    const searchBar: SearchBar = <SearchBar>args.object;
    searchBar.text = "";
    searchBar.hint = "Location search string";
    const location = new geocoding.Location();
    const page: Page = <Page>searchBar.page;
    const vm = page.bindingContext;
    vm.set("location", location);
}
