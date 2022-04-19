import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  @Output() amount = new EventEmitter<string>();
  fromSelect!: string;
  toSelect!: string;
  currencies: string[] = [];
  getCurrencySubcription: any;
  getLogViewClickSubcription: any;

  amountValue!: string;
  viewData: any;

  constructor(private currencyService: CurrencyConverterService, private appService: AppService) {
    this.getLogViewClickSubcription = this.appService.getViewData().subscribe(
      (item: any) => {
        if (item.amount && item.from && item.to) {
          this.amountValue = item.amount;
          this.viewData = item;
          this.convertCurrencyWithoutLog(item.from, item.to);
        }
        return item;
      });

    this.getCurrencySubcription = this.currencyService.getCurrencies().subscribe(
      (item: any[]) => {
        this.fromSelect = this.viewData?.from ? this.viewData?.from : item[0];
        this.toSelect = this.viewData?.to ? this.viewData?.to : item[1];
        return this.currencies = item;
      });
  }

  ngOnInit(): void {
  }

  changeAmount() {
    this.amount.emit(this.amountValue);
  }

  convertCurrencies(from: string, to: string, amount: string) {
    let date = new Date();
    this.appService.setLog({
      date: `${date.toISOString().split('T')[0]}@${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      name: `Converted an amount of ${amount} from ${from} to ${to}`,
      amount: amount,
      from: from,
      to: to
    });
    this.currencyService.convertCurrency(from, to);
  }

  convertCurrencyWithoutLog(from: string, to: string) {
    this.currencyService.convertCurrency(from, to);
  }

  changeConvert() {
    [this.fromSelect, this.toSelect] = [this.toSelect, this.fromSelect];
  }

  ngOnDestroy() {
    this.getCurrencySubcription.unsubscribe();
  }


}
