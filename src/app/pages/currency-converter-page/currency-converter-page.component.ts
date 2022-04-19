import { Component, OnInit } from '@angular/core';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-currency-converter-page',
  templateUrl: './currency-converter-page.component.html',
  styleUrls: ['./currency-converter-page.component.scss']
})
export class CurrencyConverterPageComponent implements OnInit {
  
  errorMessage: string | undefined;
  amount!:string;

  constructor(private currencyService: CurrencyConverterService) {
    this.getLatestRates();
   }

  ngOnInit(): void {
    console.log(this.amount);
  }
  
  getLatestRates(): void {
    this.errorMessage = "";
    this.currencyService.getLatestRates().subscribe({
      next: response => {
        console.log(response)
        let currencies = Object.keys(response.rates);
        console.log(currencies);
        this.currencyService.setCurrencies(currencies);
      },
      error: error => {
        this.errorMessage = error;
      },
      complete: () => {
        // console.log(this.items);
      }
    })
  };

  changeAmount(eventData:string ) {
    this.amount = eventData
  }

}
