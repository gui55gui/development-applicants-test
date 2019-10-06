import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Weather} from "./weathers.model";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class WeathersService {

    constructor(private httpClient: HttpClient) {
    }

    url = 'http://localhost:3333/api';

    listarTodos(): Observable<Weather[]>{
        return this.httpClient.get<Weather[]>(this.url+"/weather").pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
