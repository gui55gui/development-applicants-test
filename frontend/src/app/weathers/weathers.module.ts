import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {ListarWeatherComponent} from "./listar/listar-weather.component";

@NgModule({
    declarations: [ListarWeatherComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    providers: []
})
export class WeathersModule {
}
