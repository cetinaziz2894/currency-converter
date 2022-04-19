import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  baseURL: string = "https://api.exchangerate.host";
  currencies: any = new BehaviorSubject<any>({});
  rateInfo: any = new BehaviorSubject<any>({});
  histories: any = new BehaviorSubject<any>({});
  statics: any = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private appService: AppService) { }

  getLatestRates(): Observable<any> {
    return this.http.get(this.baseURL + '/latest');
  }

  convertCurrency(from:string,to:string){
    this.getRate(from,to);
  }

  setCurrencies(data: any) {
    this.currencies.next(data);
  }

  getCurrencies() {
    return this.currencies.asObservable();
  }

  getExchangeHistories(date: string): Observable<any> {
    let today = new Date();
    let endDate = today.toISOString().split('T')[0];
    today.setDate(today.getDate() - parseInt(date));
    let startDate = today.toISOString().split('T')[0];
    return this.http.get(this.baseURL + '/timeseries?start_date='+startDate+'&end_date='+endDate);
  }

  setHistories(data: any) {
    this.histories.next(data);
  }

  getHistories() {
    return this.histories.asObservable();
  }

  setStatistics(data: any) {
    this.statics.next(data);
  }

  getStatistics() {
    return this.statics.asObservable();
  }


  getRate(from: string, to: string) {
    this.http.get(this.baseURL + '/convert?from=' + from + '&to=' + to).subscribe(
      {
        next: response => {
          this.setCurrencyRate(response);
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
        }
      }
    );
  }

  setCurrencyRate(data: any) {
    this.rateInfo.next(data);
  }

  getCurrencyRate() {
    return this.rateInfo.asObservable();
  }
}
