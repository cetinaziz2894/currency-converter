import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs:any[] = [];
  displayedColumns: string[] = ['date', 'events', 'action'];
  errorMessage: any;

  constructor(private appService: AppService,private router: Router) { 
    this.appService.loadLogs().subscribe({
      next: (response:any) => {
        console.log(response);
        this.logs = JSON.parse(response);
      },
      error: (error:any) => {
        this.errorMessage = error;
      },
      complete: () => {
      }
    })
  }

  ngOnInit(): void {
  }

  viewConvertion(el:any){
    this.appService.setViewData(el);
    this.router.navigate(['/currency-converter']);
  }

  deleteLog(el:any){
    this.appService.removeLog(el);
  }

}
