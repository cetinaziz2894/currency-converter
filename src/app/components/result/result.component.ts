import { Component, Input, OnInit } from '@angular/core';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  getRateCurrencySubcription: any;
  rate:number | undefined | any;

  @Input() amount!: string;

  fromToResult!:number;
  toFromResult!:number;
  result!:number;

  constructor(private currencyService: CurrencyConverterService) { }

  ngOnInit(): void {
    this.getRateCurrencySubcription = this.currencyService.getCurrencyRate().subscribe(
      (item: { result: number; }) => {
        console.log(item);
        this.result = parseInt(this.amount) * item?.result;
        this.fromToResult = item?.result;
        this.toFromResult = 1/item?.result;
        return this.rate = item;
      }
    );
  }

  ngOnDestroy() {
    this.getRateCurrencySubcription.unsubscribe();
  }

}
