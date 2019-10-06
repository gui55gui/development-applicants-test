import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {WeathersModule} from "./weathers";
import {MatProgressSpinnerModule} from "@angular/material";
import {LoaderInterceptor} from "./components/loader/loader.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderComponent} from "./components/loader";
import {LoaderService} from "./components/loader/loader.service";

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        WeathersModule,
        MatProgressSpinnerModule
    ],
    providers: [LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
