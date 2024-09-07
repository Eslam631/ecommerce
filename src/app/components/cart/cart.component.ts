import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { count } from 'console';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService=inject(CartService)
  cartDetalies:Icart ={}as Icart
  numItem!:number

  private readonly _ToastrService=inject(ToastrService)

  ngOnInit(): void {
      this._CartService.getProductItems().subscribe({
        next: (res) => {
         this.cartDetalies=res.data
         console.log(this.cartDetalies)
         this.numItem=res.data.products.length


        },
        error: (error) => {

        }
      })
  }
  removeItem(id:string):void{
    this._CartService.removeSpacificCart(id).subscribe({
      next: (res) => {
        this.cartDetalies=res.data
        console.log(res)
        this._ToastrService.success(res.status)
        this._CartService.cardNumber.next(res.numOfCartItems)
        this.numItem=res.data.products.length
      },
      error: (error) => {

      }
    })
  }

updateCount(id:string , count:number):void{
  if(count>0){
  this._CartService.updateCartCount(id,count).subscribe({
    next: (res) => {
      this.cartDetalies=res.data
      this._ToastrService.success(res.status)
    },
    error: (error) => {
      console.log(error)
    }
  })
}
}
clearFormCard():void{
  this._CartService.clearForm().subscribe({
    next: (res) => {
     if(res.message=='success'){
      this.cartDetalies={} as Icart
      this._ToastrService.success(res.message)
      this._CartService.cardNumber.next(res.numOfCartItems)
      this.numItem=0
     }

    },
    error: (error) => {}
  })


}


}
