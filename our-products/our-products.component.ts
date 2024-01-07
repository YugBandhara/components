import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import {product} from '../../components/our-products/samaple'
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'underscore';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss']
})
export class OurProductsComponent implements OnInit {


  constructor( private primengConfig: PrimeNGConfig,    private sanitizer: DomSanitizer) { }
  @Input() dashboardProd:any=[]
  public checked: boolean = false;
  public FilterOptions:any=[];
  public selectedOptions:any;
  public items:any=[];
  public products:any=[]
  public displayProd:any=[]
  public totalProductCount:number =0
  ngOnInit(): void {
    // this.primengConfig.ripple = true;
    this.products= product
    console.log(this.dashboardProd,"dashboardProd")
    this.dashboardProd.map((v:any)=>{
      if(v&&v.p_Img[0]){
        v.p_Img[0]=this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+v.p_Img[0]);
        this.displayProd.push(v)
      }
    })
    this.totalProductCount=this.dashboardProd.length
    console.log(this.dashboardProd,"afersdashboardProd",this.displayProd)

    this.items = [{
      label: 'Men Clothes',
      expanded: true,
      items: [
          {label: 'Formal Shirts',},
          {label: 'Casual Pants'},
          {label: 'Casual T-shirts'},
          {label: 'Trousers'},
          {label: 'Hoodies'}
      ]},{
        label: 'Women Clothes',

        items: [
            {label: 'Formal Wear'},
            {label: 'Party Wear'},
            {label: 'kurti'},
            {label: 'Saree'}
        ]},{
      label: 'Perfumes',
      items: [
          {label: 'Deodrant'},
          {label: 'Perfume'}
      ]}]
      this.FilterOptions=[
        // {name:"Best Match"},
        {name: 'Price High-Low', },
          {name: 'Price Low-high',},
          {name:"Highest Rated"}
      ]
  }
  handleStockEvent(event:any){
    console.log(event)
    let filterProducts:any=[]
    console.log(this.displayProd,"beforestockkkk")
    console.log(this.selectedOptions)
    if(event.checked){
      filterProducts= this.displayProd.filter((v:any)=>
        v.p_availability=='Yes')
    }
    else{
      filterProducts=this.dashboardProd
      console.log(this.dashboardProd,"dassss",filterProducts)
    }
    if (this.selectedOptions && this.selectedOptions.name=="Price Low-high"){
      console.log("firstttt")
      this.displayProd=this.convertToAscendingByPrice(filterProducts)
      console.log(filterProducts)
    }
    else if (this.selectedOptions &&this.selectedOptions.name=="Price High-Low"){

      this.displayProd=this.convertToDescendingByPrice(filterProducts)
    }
    else if(this.selectedOptions && this.selectedOptions.name=="Highest Rated"){
      this.displayProd=this.convertToDescendingByRating(filterProducts)
    }
    this.totalProductCount=filterProducts.length
  }
  
  handleFilterEvent(value:any){
    console.log(value)
    console.log(this.displayProd,"beforedisplayyyy",this.checked)
    // this.displayProd=this.dashboardProd
    let filterProducts:any=[]
    if(this.checked){
      this.displayProd.map((v:any)=>{
        filterProducts.push(v)
      })
    }
    else{
      this.dashboardProd.map((v:any)=>{
        filterProducts.push(v)
      })
    }
    if (value.name=="Price Low-high"){
      console.log("firstttt")
      this.displayProd=this.convertToAscendingByPrice(filterProducts)
      console.log(filterProducts)
    }
    else if (value.name=="Price High-Low"){

      this.displayProd=this.convertToDescendingByPrice(filterProducts)
    }
    else if(value.name="Highest Rated"){
      this.displayProd=this.convertToDescendingByRating(filterProducts)
    }
    console.log(this.displayProd,"afterrrrr",this.dashboardProd)
  }
  convertToAscendingByPrice(arr:[]){
    arr.sort(function(a:any, b:any) {
      return parseFloat(a.discount_price) - parseFloat(b.discount_price);
  });
  return arr
  }
  convertToDescendingByPrice(arr:[]){
    arr.sort(function(a:any, b:any) {
      return parseFloat(b.discount_price) - parseFloat(a.discount_price);
  });
  return arr
  }
  convertToDescendingByRating(arr:[]){
    arr.sort(function(a:any, b:any) {
      return parseFloat(b.p_rating) - parseFloat(a.p_rating);
  });
  return arr
  }
}
