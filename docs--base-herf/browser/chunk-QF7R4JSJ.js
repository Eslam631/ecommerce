import{l as $}from"./chunk-6BDNO2Q6.js";import{a as P}from"./chunk-OYC4FVUT.js";import{i as V}from"./chunk-IZDHB5GI.js";import"./chunk-TF6EPCZ3.js";import{n as F}from"./chunk-UKABTF7F.js";import{Ab as d,Ib as l,Jb as v,Kb as h,Na as w,Qb as E,Ra as s,Sb as D,Xb as g,Zb as S,aa as C,da as b,gb as k,ib as x,mb as T,na as p,oa as u,ob as y,pb as I,qb as r,rb as a,sb as m,vb as f,zb as _}from"./chunk-INXF3MO3.js";var j=(n,o)=>o.product.id,B=n=>["/order",n];function O(n,o){if(n&1){let i=f();r(0,"div",5)(1,"div",7)(2,"div"),m(3,"img",8),a()(),r(4,"div",9)(5,"div")(6,"h3",10),l(7),a(),r(8,"p",11),l(9),g(10,"currency"),a(),r(11,"span",12),_("click",function(){let e=p(i).$implicit,c=d(2);return u(c.removeItem(e.product.id))}),m(12,"i",13),l(13," Delete"),a()(),r(14,"div",14)(15,"span",15),_("click",function(){let e=p(i).$implicit,c=d(2);return u(c.updateCount(e.product.id,e.count+1))}),m(16,"i",16),a(),r(17,"span",17),l(18),a(),r(19,"span",15),_("click",function(){let e=p(i).$implicit,c=d(2);return u(c.updateCount(e.product.id,e.count-1))}),m(20,"i",18),a()()()()}if(n&2){let i=o.$implicit;s(3),x("src",i.product.imageCover,w)("alt",i.product.title),s(4),v(i.product.title),s(2),h("Price:",S(10,5,i.price,"GBP"),""),s(9),v(i.count)}}function L(n,o){if(n&1){let i=f();r(0,"div",1)(1,"h2",2),l(2,"ShopCart"),a(),r(3,"button",3),_("click",function(){p(i);let e=d();return u(e.clearFormCard())}),l(4,"ClearAll"),a()(),r(5,"p",4),l(6),g(7,"currency"),a(),y(8,O,21,8,"div",5,j),r(10,"button",6),l(11,"Orders"),a()}if(n&2){let i=d();s(6),h("TotalPrice:",S(7,2,i.cartDetalies.totalCartPrice,"GBP"),""),s(2),I(i.cartDetalies.products),s(2),x("routerLink",D(5,B,i.cartDetalies._id))}}function G(n,o){n&1&&(r(0,"div",19),m(1,"img",20),a())}var H=(()=>{let o=class o{constructor(){this._CartService=C(P),this.cartDetalies={},this._ToastrService=C($)}ngOnInit(){this._CartService.getProductItems().subscribe({next:t=>{this.cartDetalies=t.data,console.log(this.cartDetalies),this.numItem=t.data.products.length},error:t=>{}})}removeItem(t){this._CartService.removeSpacificCart(t).subscribe({next:e=>{this.cartDetalies=e.data,console.log(e),this._ToastrService.success(e.status),this._CartService.cardNumber.next(e.numOfCartItems),this.numItem=e.data.products.length},error:e=>{}})}updateCount(t,e){e>0&&this._CartService.updateCartCount(t,e).subscribe({next:c=>{this.cartDetalies=c.data,this._ToastrService.success(c.status)},error:c=>{console.log(c)}})}clearFormCard(){this._CartService.clearForm().subscribe({next:t=>{t.message=="success"&&(this.cartDetalies={},this._ToastrService.success(t.message),this._CartService.cardNumber.next(t.numOfCartItems),this.numItem=0)},error:t=>{}})}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=b({type:o,selectors:[["app-cart"]],standalone:!0,features:[E],decls:3,vars:1,consts:[[1,"my-5","p-4","bg-main-light","rounded-4","shadow","w-75","mx-auto"],[1,"d-flex","justify-content-between","align-items-center"],[1,"text-center"],[1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"text-main"],[1,"row","mb-1","border-bottom"],[1,"btn","btn-main",3,"routerLink"],[1,"col-md-1"],[1,"w-100",3,"src","alt"],[1,"col-md-11","d-flex","align-items-center","justify-content-between"],[1,"h5"],[1,"text-main","m-0"],[1,"text-danger","cursor-pointer",3,"click"],[1,"fa-solid","fa-trash"],[1,"d-flex","align-items-center","gap-2"],[1,"text-main","cursor-pointer",3,"click"],[1,"fa-solid","fa-circle-plus","fa-2xl"],[1,"fs-5","fw-bold"],[1,"fa-solid","fa-circle-minus","fa-2xl"],[1,"d-flex","justify-content-center"],["src","./assets/images/png-transparent-shopping-cart-grocery-store-shopping-basket-shopping-centre-shopping-bags-trolleys-material.png","alt","",1,"w-50"]],template:function(e,c){e&1&&(r(0,"section",0),k(1,L,12,7)(2,G,2,0),a()),e&2&&(s(),T(1,c.numItem!==0?1:2))},dependencies:[F,V]});let n=o;return n})();export{H as CartComponent};
