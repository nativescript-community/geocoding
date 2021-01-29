import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { COMPONENTS, InstallModule } from './linked-components/install.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, InstallModule],
    declarations: [AppComponent, MenuComponent, ...COMPONENTS],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
