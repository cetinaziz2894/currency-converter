import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  getRateCurrencySubcription: any;
  getViewDataSubcription: any;
  rate: number | undefined | any;

  @Input() amount!: string;

  fromToResult!: number;
  toFromResult!: number;
  result!: number;
  viewData: any;

  constructor(private currencyService: CurrencyConverterService, private appService: AppService) {
    this.getRateCurrencySubcription = this.currencyService.getCurrencyRate().subscribe(
      (item: { result: number; }) => {
        this.result = parseInt(this.amount) * item?.result;
        this.fromToResult = item?.result;
        this.toFromResult = 1 / item?.result;
        return this.rate = item;
      }
    );
  }

  ngOnInit(): void {
    this.getViewDataSubcription = this.appService.getViewData().subscribe(
      (item: { result: number; }) => {
        return this.viewData = item;
      }
    );
  }

  getResult(): any {
    // this.amount = this.amount ? this.amount : this.viewData.amount;
    let result = this.rate.result * Number(this.amount);
    return result;
  }

  ngAfterContentChecked() {
    this.amount = this.viewData.amount ? this.viewData.amount : this.amount;
  }

  ngOnDestroy() {
    this.getRateCurrencySubcription.unsubscribe();
  }

}
