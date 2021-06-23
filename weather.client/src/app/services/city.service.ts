import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

import { tap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private CACHE: CityModel[] = [];
    constructor(private httpClient: HttpClient) { }

    getCities(): Observable<CityModel[]> {
        if (this.CACHE.length > 0) return of(this.CACHE).pipe(take(1));

        return this.httpClient.get<CityModel[]>('/assets/list.json')
            .pipe(tap(res => this.CACHE = res), take(1));
    }
}
