import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { OrdersService } from '../../core/services/orders.service';
import { IuserData } from '../../core/interfaces/iuser-data';
import { jwtDecode } from 'jwt-decode';
import { IallOrder } from '../../core/interfaces/iall-order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly _AuthService=inject(AuthService)
  private readonly _OrdersService=inject(OrdersService)

  userID:IuserData={}as IuserData

  userProducts:IallOrder[]=[]

  ngOnInit(): void {
    if(localStorage.getItem('userToken')!==null){
      this.userID= jwtDecode(localStorage.getItem('userToken')!)





    }
    this._OrdersService.getAllOrder(this.userID.id).subscribe({
      next: (res) => {
        this.userProducts=res
        console.log(res)
      },
      error: (error) => {
        console.error(error);
      }
    })




  }



}
