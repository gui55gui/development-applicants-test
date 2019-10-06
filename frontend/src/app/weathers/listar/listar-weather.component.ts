import {Component, OnInit, ViewChild} from '@angular/core';

import {NgForm} from "@angular/forms";
import {Weather} from "../shared";

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

    constructor() {
    }

    ngOnInit() {
        this.searchCity = "";
        this.searchDate = "";
    }

}
