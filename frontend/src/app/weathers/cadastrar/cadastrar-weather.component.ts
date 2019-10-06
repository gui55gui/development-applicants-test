import {Component, OnInit, ViewChild} from '@angular/core';

import {WeathersService, Weather} from "../shared";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-cadastrar',
    templateUrl: './cadastrar-weather.component.html',
    styleUrls: ['./cadastrar-weather.component.css']
})
export class CadastrarWeatherComponent implements OnInit {

    @ViewChild('formWeather') formWeather: NgForm;
    weather: Weather;

    constructor(private weatherService: WeathersService, private router: Router, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.weather = new Weather(new Date().getTime(),{name: "", id: 0}, {lat: 0, lon: 0});
    }

    showSuccess(msg) {
        this.toastr.success(msg);
    }

    showError(msg) {
        this.toastr.error(msg);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                    if (position) {
                        this.weather.coords.lat = position.coords.latitude;
                        this.weather.coords.lon = position.coords.longitude;
                    }
                },
                (error: PositionError) => console.log(error));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    cadastrar(): void {
        if(this.formWeather.form.value.cityName == "" &&
            (this.formWeather.form.value.lat == "" || this.formWeather.form.value.lat == 0) &&
            (this.formWeather.form.value.lon == "" || this.formWeather.form.value.lon == 0)) {
            this.showError('Preencha o campo cidade ou as coordenadas para continuar!');
        } else {
            this.weatherService.cadastrar(this.weather).subscribe(data => {
                this.showSuccess('Clima cadastrado com sucesso!');
                this.router.navigate(['/weathers']);
            }, (error) => {
                const {message} = error.error;
                this.showError(message ? message : error.message);
            });
        }
    }

}
