import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    didyouMean: string = '';

    constructor(private cityService: CityService) { }

    ngOnInit(): void {

    }

    search(citynameInput: HTMLInputElement) {
        const inputValue = citynameInput.value;
        this.cityService.getCities().subscribe(citiesRes => {
            const city = citiesRes.find(c => c.city === inputValue);
            if (city) {
                console.log(city);
            } else {
                let minDistance = inputValue.length;
                let cities: string[] = [];

                citiesRes.forEach(cityStr => {
                    const distance = this.levensteinDistance(inputValue, cityStr.city);
                    if (distance < minDistance) {
                        minDistance = distance;
                        cities = [cityStr.city];
                    } else if (distance === minDistance) {
                        cities.push(cityStr.city);
                    }
                });
                console.log(cities);
                this.didyouMean = cities[0];


            }
        })
    }

    didYouMeanClick(citynameInput: HTMLInputElement) {
        citynameInput.value = this.didyouMean;
    }

    levensteinDistance(str1: string, str2: string): number {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();

        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }
        return track[str2.length][str1.length];

    }
}

