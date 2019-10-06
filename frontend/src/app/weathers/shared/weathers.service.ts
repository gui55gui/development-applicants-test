import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Weather} from "./weathers.model";
import {catchError} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WeathersService {

    constructor(private httpClient: HttpClient) {
    }

    url = environment.apiUrl;

    listarTodos(): Observable<Weather[]>{
        return this.httpClient.get<Weather[]>(this.url+"/weather").pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    remover(id: number): Observable<number> {
        return this.httpClient.delete<number>(this.url+"/weather/"+id);
    }

    buscarPorCidadeOuData(city: string, date: string): Observable<Weather[]> {
        if(city !== "" || date !== "") {
            const headers = new HttpHeaders();
            let params = new HttpParams();
            params = params.append('city', city);
            params = params.append('date', date);
            return this.httpClient.get<Weather[]>(this.url + "/weather/find", {headers, params});
        } else {
            return this.listarTodos();
        }
    }

    cadastrar(weather: Weather): Observable<Weather> {
        return this.httpClient.post<Weather>(this.url+"/weather", {city_name: weather.city.name, city_id: weather.city.id, lat: weather.coords.lat, lon: weather.coords.lon, observation: weather.observation}).pipe(catchError(this.handleError));
    }
}
