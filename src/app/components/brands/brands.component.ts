import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  getBrandsProduct:Icategories[]=[]
  brandsSup!:Subscription

  private readonly _CategoriesService=inject(CategoriesService)
ngOnInit(): void {
   this.brandsSup= this._CategoriesService.getBrands().subscribe({
      next: (res) => {
        this.getBrandsProduct=res.data
      },
      error: (err) => {}
    })
}
ngOnDestroy(): void {
  this.brandsSup?.unsubscribe()

}

}
