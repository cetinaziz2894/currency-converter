import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  
  @Output() amount = new EventEmitter<string>();
  fromSelect: string = '';
  toSelect: string = '';
  currencies : string[] = [];
  getCurrencySubcription: any;
  
  amountValue!: string;
  constructor(private currencyService: CurrencyConverterService) {
   }

  hide = true;
  ngOnInit(): void {
    this.getCurrencySubcription = this.currencyService.getCurrencies().subscribe(
      (item: any[]) => {
        this.fromSelect = item[0];
        this.toSelect = item[1];
        return this.currencies = item;
      });
  }

  changeAmount() {
    this.amount.emit(this.amountValue);
  }

  convertCurrencies(from:string,to:string){
    this.currencyService.getRate(from,to);
  }

  changeConvert(){
    [this.fromSelect, this.toSelect] = [this.toSelect, this.fromSelect];
  }

  ngOnDestroy() {
    this.getCurrencySubcription.unsubscribe();
  }
}
