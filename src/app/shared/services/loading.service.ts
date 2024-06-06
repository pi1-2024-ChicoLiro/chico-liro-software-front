import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    async showLoading(show) {
        this.$loading.next(show);
    }
}
