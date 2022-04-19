import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface RateElement {
  date: string;
  rate: number;
}

export interface Statics {
  name:string,
  val:number
}

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnInit {

  getHistoriesSubcription: any;
  histories:RateElement[] = [];
  statics:Statics[] = [];
  data:any = [];
  selected:string='7';
  getExchangeHistorySubcription: any;

  displayedColumns: string[] = ['date', 'exchange_rate'];
  displayedStaticsColumns: string[] = ['statics','value'];
  errorMessage: any;

  constructor(private currencyService: CurrencyConverterService) {
    this.currencyService.getHistories().subscribe({
      next: (response:any) => {
        console.log(response);
        this.histories = response;
      },
      error: (error:any) => {
        this.errorMessage = error;
      },
      complete: () => {
        // console.log(this.items);
      }
    });
    this.currencyService.getStatistics().subscribe({
      next: (response:any) => {
        console.log(response);
        this.statics = response;
      },
      error: (error:any) => {
        this.errorMessage = error;
      },
      complete: () => {
        // console.log(this.items);
      }
    })
   }

  ngOnInit(): void {
    this.getExchangeHistory();
  }

  getExchangeHistory(){
    this.getExchangeHistorySubcription = this.currencyService.getCurrencyRate().pipe(
      switchMap((data: any[]) => {
        if (data) {
            this.data = data;
            return this.currencyService.getExchangeHistories(this.selected);
        }
        return of(undefined);
    }),
    ).subscribe((res: any) => {
      console.log(res);
      if (this.data.query) {
        let historiesData:RateElement[] = [];
        let staticsData:Statics[] = [];
        for (var key in res.rates) {
          if (res.rates.hasOwnProperty(key)) {
            const element = res.rates[key];
            let fromToEuro = 1/element[this.data.query.from];
            let toToEuro = 1/element[this.data.query.to];
            let rate = fromToEuro / toToEuro;
            historiesData.push({date:key,rate:rate});
          }
        }

        this.currencyService.setHistories(historiesData);
        let highest = Math.max.apply(Math, this.histories.map(function(o) { return o.rate; }));
        staticsData.push({name:'Highest', val:highest});

        let lowest = Math.min.apply(Math, this.histories.map(function(o) { return o.rate; }));
        staticsData.push({name:'Lowest', val:lowest});

        let average = this.histories.reduce((total, next) => total + next.rate, 0) / this.histories.length;
        staticsData.push({name:'Average', val:average});
        this.currencyService.setStatistics(staticsData);
      }
      return res;
    });
  }

  isSelected(val:boolean){
    return val;
  }

  
  ngOnDestroy() {
    this.getExchangeHistorySubcription.unsubscribe();
  }

}
