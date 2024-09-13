import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule,CurrencyPipe,NgxPaginationModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

productsList:Iproduct[]=[];
getAllProductSub!:Subscription
getAllCatogriesSub!:Subscription
categorieslist:Icategories[]=[]
text:string="";
wishId:any=null

  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishlistService=inject(WishlistService)


  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;


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
    navText: ['', ''],
    items:1,
    nav: true
  }




  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {



   this.getAllCatogriesSub= this._CategoriesService.getCatogeries().subscribe({
      next: (res) => {
     this.categorieslist= res.data

      },
      error(err){
        console.log(err)
      }
    })




    this.getAllProductSub=this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
      this.productsList=res.data
      this.pageSize = res.metadata.limit;
this.currentPage = res.metadata.currentPage;
this.total = res.results;




this.wishId =res.data
if (localStorage.getItem("heart") !==null) {
  this.wishId = localStorage.getItem('heart')
}

      },
      error:(err)=>{


      }
    });



  }

  ngOnDestroy():void{
    this.getAllProductSub?.unsubscribe()
    this.getAllCatogriesSub?.unsubscribe()

  }

  addCart(id:string):void{
    this._CartService.getCartItems(id).subscribe({
      next:(res)=>{

        this._ToastrService.success(res.message,res.status)
        this._CartService.cardNumber.next(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addWishList(id:string){
    this._WishlistService.addWishList(id).subscribe({
      next:(res)=>{

        this._ToastrService.success(res.message,res.status)
        this.wishId=res.data
        localStorage.setItem('heart',this.wishId.toString())



      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  pageChanged(event: any): void {
    this._ProductsService.getAllProducts(event).subscribe({
      next: (response) => {
        console.log(response.metadata);
        this.productsList = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;

      },
      error: (err) => {console.log(err);
      }
    });
  }


}
