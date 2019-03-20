<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Geocoding Vue"></Label>
        </ActionBar>

        <StackLayout class="page">
                <SearchBar hint="Location search string" [text]="searchString" @clear="onSearchBarClear($event)"  @submit="onSubmit($event)"></SearchBar>
                <Label text="Name: {{location.name}}"></Label>
                <Label text="Postal code: {{location.postalCode}}"></Label>
                <Label text="Country code: {{location.isoCountryCode}}"></Label>
                <Label text="Country: {{location.country}}"></Label>
                <Label text="Locality: {{location.locality}}"></Label>
                <Label text="Sub-locality: {{location.subLocality}}"></Label>
                <Label text="Administrative Area: {{location.administrativeArea}}"></Label>
                <Label text="Sub-Administrative Area: {{location.subAdministrativeArea}}"></Label>
                <Label text="Thoroughfare: {{location.thoroughfare}}"></Label>
                <Label text="Sub-Thoroughfare: {{location.subThoroughfare}}"></Label>
                <Label text="Latitude: {{location.latitude}}"></Label>
                <Label text="Longitude: {{location.longitude}}"></Label>
        </StackLayout>
    </Page>
</template>

<script>
    import * as geocoding from "nativescript-geocoding";
    import { Accuracy } from "tns-core-modules/ui/enums";
    export default {
        data() {
            return {
                watchIds: [],
                locations: []
            }
        },
        methods: {
            enableLocationTap: function() {
                geolocation.isEnabled().then(function (isEnabled) {
                    if (!isEnabled) {
                        geolocation.enableLocationRequest().then(function () { }, function (e) {
                            console.log("Error: " + (e.message || e));
                        });
                    }
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
            },
            buttonGetLocationTap: function() {
                let that = this;
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: 10000
                }).then(function (loc) {
                    if (loc) {
                        that.locations.push(loc);
                    }
                }, function (e) {
                    console.log("Error: " + (e.message || e));
                });
            },
            buttonStartTap: function() {
                try {
                    let that = this;
                    this.watchIds.push(geolocation.watchLocation(
                        function (loc) {
                            if (loc) {
                                that.locations.push(loc);
                            }
                        },
                        function (e) {
                            console.log("Error: " + e.message);
                        },
                        {
                            desiredAccuracy: Accuracy.high,
                            updateDistance: 1,
                            updateTime: 3000,
                            minimumUpdateTime: 100
                        }));
                } catch (ex) {
                    console.log("Error: " + ex.message);
                }
            },
            buttonStopTap: function() {
                let watchId = this.watchIds.pop();
                while (watchId != null) {
                    geolocation.clearWatch(watchId);
                    watchId = this.watchIds.pop();
                }
            },
            buttonClearTap: function() {
                this.locations.splice(0, this.locations.length);
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables
    // Custom styles
    .fa {
        color: $accent-dark;
    }
    .info {
        font-size: 20;
    }
</style>