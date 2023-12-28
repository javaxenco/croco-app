import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProvidersModel } from '../models/providers.model';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  http = inject(HttpClient);
  API_KEY = 'https://cms.crocobet.com/integrations';

  getProviders(): Observable<ProvidersModel> {
    const params = new HttpParams()
      .append('type', 'slot')
      .append('platform', 'desktop');
    return this.http.get<ProvidersModel>(this.API_KEY, {
      params,
    });
  }
}
