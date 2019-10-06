import {Routes} from "@angular/router";

import {ListarWeatherComponent} from "./listar";
import {CadastrarWeatherComponent} from "./cadastrar";

export const WeatherRoutes: Routes = [
    {
        path: 'weathers',
        redirectTo: 'weathers/listar'
    },
    {
        path: 'weathers/listar',
        component: ListarWeatherComponent
    },
    {
        path: 'weathers/cadastrar',
        component: CadastrarWeatherComponent
    }
];
