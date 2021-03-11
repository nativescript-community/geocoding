<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Geocoding Vue"></Label>
        </ActionBar>

        <StackLayout class="page">
            <SearchBar ref="searchBar" hint="Location search string" :text="searchString" @clear="onSearchBarClear" @submit="onSubmit"></SearchBar>
            <Button text="fromLocation" @tap="getFromLocation" />
            <StackLayout v-if="location">
                <Label :text="`Name: ${location.name}`"></Label>
                <Label :text="`Postal code: ${location.postalCode}`"></Label>
                <Label :text="`Country code: ${location.isoCountryCode}`"></Label>
                <Label :text="`Country: ${location.country}`"></Label>
                <Label :text="`Locality: ${location.locality}`"></Label>
                <Label :text="`Sub-locality: ${location.subLocality}`"></Label>
                <Label :text="`Administrative Area: ${location.administrativeArea}`"></Label>
                <Label :text="`Sub-Administrative Area: ${location.subAdministrativeArea}`"></Label>
                <Label :text="`Thoroughfare: ${location.thoroughfare}`"></Label>
                <Label :text="`Sub-Thoroughfare: ${location.subThoroughfare}`"></Label>
                <Label :text="`Latitude: ${location.latitude}`"></Label>
                <Label :text="`Longitude: ${location.longitude}`"></Label>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as geocoding from '@nativescript-community/geocoding';
import { NativeScriptVue } from 'nativescript-vue';
import { SearchBar } from '@nativescript/core';
export default {
    data() {
        return {
            watchIds: [],
            locations: [],
            location: null
        };
    },
    methods: {
        onSubmit(args) {
            const searchBar = (this.$refs.searchBar as NativeScriptVue<SearchBar>).nativeView;
            geocoding.getLocationListFromName(searchBar.text, 5).then(
                locations => {
                    console.log('Found ', locations.length);
                    if (locations.length > 0) {
                        this.location = locations[0];
                    }
                },
                function (e) {
                    console.log('Error: ' + (e.message || e));
                }
            );
        },

        onSearchBarClear(args) {
            this.location = new geocoding.Location();
        },

        getFromLocation() {
            geocoding.getFromLocation(45.18896, 5.72716, 5).then(
                locations => {
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
    }
};
</script>
