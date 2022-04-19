import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageRefService } from './local-storage-ref.service';

interface Log {
  name: string
  date: Date,
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  logs: any = new BehaviorSubject<any>({});
  viewData = new BehaviorSubject<any>({});;

  private _localStorage: Storage;

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage
  }

  setLog(data: any) {
    var values = [];
    values = JSON.parse(localStorage.getItem('logs') || '[]');
    values.push(data);
    localStorage.setItem('logs', JSON.stringify(values));
    this.logs.next(values);
  }

  loadLogs() {
    const data = localStorage.getItem('logs');
    this.logs.next(data);
    return this.logs.asObservable();
  }

  clearLog() {
    this._localStorage.removeItem('logs');
    this.logs.next(null);
  }

  removeLog(el: any) {
    console.log(el);
    let data = [];
    data = JSON.parse(localStorage.getItem('logs') || '[]');
    data.splice(el, 1);
    console.log(data);
    localStorage.setItem('logs', JSON.stringify(data));
    this.logs.next(data);
  }

  setViewData(data: any) {
    this.viewData.next(data);
  }

  getViewData() {
    return this.viewData.asObservable();
  }
}
