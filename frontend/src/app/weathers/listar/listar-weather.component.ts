import {Component, OnInit, ViewChild} from '@angular/core';

import {NgForm} from "@angular/forms";
import {Weather, WeathersService} from "../shared";
import {ToastrService} from "ngx-toastr";

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

    constructor(private weatherService: WeathersService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.weathers = this.listarTodos();
        this.searchCity = "";
        this.searchDate = "";
    }

    showSuccess(msg) {
        this.toastr.success(msg);
    }

    showError(msg) {
        this.toastr.error(msg);
    }

    remover($event: any, weather: Weather): void {
        $event.preventDefault();
        if(confirm('Deseja remover o clima?')) {
            this.weatherService.remover(weather._id).subscribe(data => {
                this.showSuccess('Clima removido com sucesso!');
                this.weathers = this.listarTodos();
            }, (error) => {
                const {message} = error.error;
                this.showError(message ? message : error.message);
            });
        }
    }

    listarTodos(): Weather[] {
        this.weatherService.listarTodos().subscribe(data => {
            this.weathers = data;
        }, (error) => {
            const {message} = error.error;
            this.showError(message ? message : error.message);
            this.weathers = [];
        });
        return this.weathers;
    }

}
