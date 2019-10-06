import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {ListarWeatherComponent} from "./listar/listar-weather.component";
import {HttpClientModule} from "@angular/common/http";
import {WeathersService} from "./shared";
import {CadastrarWeatherComponent} from "./cadastrar";

@NgModule({
    declarations: [ListarWeatherComponent, CadastrarWeatherComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [WeathersService]
})
export class WeathersModule {
}
