import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourismApiService {

  constructor(private _http: HttpClient) { }

  addBranch(place: any) {
    return this._http.post(environment.branchService+"/add-places", place).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  } 

  searchBranch(criteria:any, criteriaValue: any) {
    return this._http.get(environment.searchService + "/" + criteria + "/" + criteriaValue).pipe(catchError(this.handleError));
  }

  updateTariff(branchId:any, tariff: any) {
    return this._http.put(environment.branchService + "/update-tariff/" + branchId, tariff).pipe(catchError(this.handleError));
  }

}
