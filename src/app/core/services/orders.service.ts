import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private _HttpClient:HttpClient) { }




  checkOut(idCart:string|null,shippingDetalies:object ):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${window.location.origin}`,
      {
        "shippingAddress":shippingDetalies
      },
   );
  }



  getAllOrder(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }

  cashOrder(id:string|null,shippingDetalies:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      {
        "shippingAddress":shippingDetalies
      }
    )
  }
}
