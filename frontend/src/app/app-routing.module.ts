import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WeatherRoutes} from "./weathers";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'weathers/listar',
        pathMatch: 'full'
    },
    ...WeatherRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
