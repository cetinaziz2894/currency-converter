import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-currency-converter-page',
  templateUrl: './currency-converter-page.component.html',
  styleUrls: ['./currency-converter-page.component.scss']
})
export class CurrencyConverterPageComponent implements OnInit {
  
  amount!:string;

  constructor(private currencyService: CurrencyConverterService) {
    this.getLatestRates();
   }

  ngOnInit(): void {
  }
  
  getLatestRates(): void {
    this.currencyService.getLatestRates().subscribe({
      next: response => {
        let currencies = Object.keys(response.rates);
        this.currencyService.setCurrencies(currencies);
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
      }
    })
  };

  changeAmount(eventData:string ) {
    this.amount = eventData
  }

}
