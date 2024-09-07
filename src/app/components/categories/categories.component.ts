import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  private readonly _CategoriesService=inject(CategoriesService)

  getCatogriesProduct:Icategories[]=[]

  categoriesSup!:Subscription

ngOnInit(): void {
    this.categoriesSup=this._CategoriesService.getCatogeries().subscribe({
      next:(res)=> {
this.getCatogriesProduct=res.data


      },
      error:(err)=>{

      }

    })
}
ngOnDestroy(): void {
  this.categoriesSup?.unsubscribe()

}
}
