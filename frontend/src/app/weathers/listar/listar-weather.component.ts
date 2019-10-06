import {Component, OnInit, ViewChild} from '@angular/core';

import {NgForm} from "@angular/forms";
import {Weather, WeathersService} from "../shared";
import {ToastrService} from "ngx-toastr";
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap";

@Component({
    selector: 'app-listar-weather',
    templateUrl: './listar-weather.component.html',
    styleUrls: ['./listar-weather.component.css']
})
export class ListarWeatherComponent implements OnInit {
    datePickerConfig: Partial<BsDatepickerConfig>;
    @ViewChild('formList') formList: NgForm;
    weathers: Weather[];
    searchCity: string;
    searchDate: string;

    constructor(private weatherService: WeathersService, private toastr: ToastrService, private _localeService: BsLocaleService) {
        this._localeService.use('pt-br');
        this.datePickerConfig = Object.assign({}, {containerClass: 'theme-blue'});
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

    buscar(): Weather[] {
        if(this.searchCity == "" && (this.searchDate == "" || this.searchDate == null)) {
            this.weathers = this.listarTodos();
        } else {
            let formattedDate = "";
            if(this.searchDate) {
                const dateAux = new Date(this.searchDate);
                formattedDate = dateAux.getDate() + "/" + dateAux.getMonth() + "/" + dateAux.getFullYear();
            }
            this.weatherService.buscarPorCidadeOuData(this.searchCity, formattedDate).subscribe(data => {
                this.weathers = data;
            }, (error) => {
                const {message} = error.error;
                this.showError(message ? message : error.message);
            });
        }
        return this.weathers;
    }

    limpar() : Weather[] {
        this.searchCity = "";
        this.searchDate = "";
        this.formList.form.value.searchCity = "";
        this.formList.form.value.searchDate = null;
        return this.listarTodos();
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
