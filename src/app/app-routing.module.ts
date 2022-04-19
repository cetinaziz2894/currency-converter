import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertionHistoryPageComponent } from './pages/convertion-history-page/convertion-history-page.component';
import { CurrencyConverterPageComponent } from './pages/currency-converter-page/currency-converter-page.component';

const routes: Routes = [
  { path: 'currency-converter', component: CurrencyConverterPageComponent},
  { path: 'convertion-history', component: ConvertionHistoryPageComponent },
  { path: '', redirectTo: 'currency-converter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
