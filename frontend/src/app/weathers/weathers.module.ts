import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {ListarWeatherComponent} from "./listar/listar-weather.component";
import {HttpClientModule} from "@angular/common/http";
import {WeathersService} from "./shared";
import {CadastrarWeatherComponent} from "./cadastrar";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {BsDatepickerModule} from "ngx-bootstrap";

// Define o locale para portugues - br. (necessario para utilizar o locale no componente)
defineLocale('pt-br', ptBrLocale);

@NgModule({
    declarations: [ListarWeatherComponent, CadastrarWeatherComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: false
        }),
        BsDatepickerModule.forRoot(),
    ],
    providers: [WeathersService]
})
export class WeathersModule {
}
