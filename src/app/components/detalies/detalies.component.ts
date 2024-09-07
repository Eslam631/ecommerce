import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalies',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalies.component.html',
  styleUrl: './detalies.component.scss'
})
export class DetaliesComponent implements OnInit,OnDestroy{

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: [' ', ' '],
    items:1,
    nav: true
  }




  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  productDetailes:Iproduct|null=null

  productSub!:Subscription

  ngOnInit(): void {
this.productSub= this._ActivatedRoute.paramMap.subscribe({
  next: (p) => {
let idProduct=p.get('id')


 this._ProductsService.getSpecificProducts(idProduct).subscribe({
  next:(res)=> {

this.productDetailes=res.data
  },
  error:(error)=>{
    console.log(error)
  }
})


  }
})


  }


  addCart(id:string):void{
    this._CartService.getCartItems(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message,res.status)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
      this.productSub.unsubscribe()
  }


}
