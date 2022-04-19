import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';
import { ExchangeHistoryComponent } from './components/exchange-history/exchange-history.component';
import { CurrencyConverterPageComponent } from './pages/currency-converter-page/currency-converter-page.component';
import { ConvertionHistoryPageComponent } from './pages/convertion-history-page/convertion-history-page.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/result/result.component';
import { ChartComponent } from './components/chart/chart.component';
import { IgxCategoryChartModule, IgxLegendModule } from 'igniteui-angular-charts';
import { LogsComponent } from './components/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    ExchangeHistoryComponent,
    CurrencyConverterPageComponent,
    ConvertionHistoryPageComponent,
    ResultComponent,
    ChartComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxCategoryChartModule,
    IgxLegendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
