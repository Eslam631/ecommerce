import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService=inject(WishlistService)
  wishListProducts: Iwishlist[] =[]

  ngOnInit(): void {
      this._WishlistService.getProductItem().subscribe({
        next: (res) =>{
this.wishListProducts=res.data
console.log(this.wishListProducts)
        }
        ,
        error: (error) => {console.error(error)}
      })
  }
  removeItem(id:string){
    this._WishlistService.removeWishItem(id).subscribe({
      next: (res) =>{
        localStorage.setItem('heart',res.data)

        this._WishlistService.getProductItem().subscribe({
          next: (res) =>{
  this.wishListProducts=res.data
  console.log(this.wishListProducts)
          }
          ,
          error: (error) => {console.error(error)}
        })
      },
      error: (error) => {console.error(error)}
    })
  }
}
