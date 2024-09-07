import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
 ordres:FormGroup= new FormGroup({
   details:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  city:new FormControl(null,[Validators.required])

  })


  private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _OrdersService=inject(OrdersService)
private readonly _Router=inject(Router)
private readonly _CartService=inject(CartService)

  cartId:string|null=''

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
      this.cartId=  params.get('id')
      },

    })

  }




   orderSumbit():void{

    console.log(this.ordres.value)


      this._OrdersService.checkOut(this.cartId,this.ordres.value).subscribe({
        next: (res) => {
          console.log(res)
          if(res.status='success'){

            window.open(res.session.url,'_self')
            this._CartService.cardNumber.next(res.numOfCartItems)

          }
        },
        error: (err) => {
          console.log(err)
        }
      })






   }
   cashPay():void{
    this._OrdersService.cashOrder(this.cartId,this.ordres.value).subscribe({
      next: (res) => {
        console.log(res)
    if(res.status='success'){

      this._Router.navigate(['/allorders'])
      this._CartService.cardNumber.next(res.numOfCartItems)
    }


      }
      ,
      error: (err) => {}
    })

   }


}
