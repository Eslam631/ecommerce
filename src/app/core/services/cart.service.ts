import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { count } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private _HttpClient:HttpClient) { }
  cardNumber:BehaviorSubject<number>=new BehaviorSubject(0)

  getCartItems(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {"productId": id},

    )
  }

  getProductItems():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,

    )
  }
  removeSpacificCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,

    )

  }

  updateCartCount(id:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count":newCount
      },

    )
  }

  clearForm():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,

    )

  }
}
