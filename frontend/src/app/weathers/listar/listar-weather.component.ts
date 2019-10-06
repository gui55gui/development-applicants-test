import {Component, OnInit, ViewChild} from '@angular/core';

import {NgForm} from "@angular/forms";
import {Weather, WeathersService} from "../shared";

@Component({
    selector: 'app-listar-weather',
    templateUrl: './listar-weather.component.html',
    styleUrls: ['./listar-weather.component.css']
})
export class ListarWeatherComponent implements OnInit {
    @ViewChild('formList') formList: NgForm;
    weathers: Weather[];
    searchCity: string;
    searchDate: string;

    constructor(private weatherService: WeathersService) {
    }

    ngOnInit() {
        this.weathers = this.listarTodos();
        this.searchCity = "";
        this.searchDate = "";
    }

    listarTodos(): Weather[] {
        this.weatherService.listarTodos().subscribe(data => {
            this.weathers = data;
        }, (error) => {
            const {message} = error.error;
            this.weathers = [];
        });
        return this.weathers;
    }

}
