import {Routes} from "@angular/router";

import {ListarWeatherComponent} from "./listar";

export const WeatherRoutes: Routes = [
    {
        path: 'weathers',
        redirectTo: 'weathers/listar'
    },
    {
        path: 'weathers/listar',
        component: ListarWeatherComponent
    }
];
