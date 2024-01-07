import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  public footerData:any=[]

  ngOnInit(): void {
    this.footerData=[{
      label:"Popular Categories",
      data:["Men's Wear", "Women's Wear","Perfume"]
    },
  {
    label:"Our Company",
    data:["About Us" , "Terms and Conditions","Secure Payment"]
  },
  {
    label:"Services",
    data:["Price Drop" , "Best Sales","New Products"]
  },  {
    label:"Contact",
    data:[{icon:"fas fa-map-marker-alt",val:"419 State ,Toronto,CA"} , {icon:"fa fa-phone",val:"123-456-7890"},{icon:"fa fa-envelope",val:"sample@gmail.com"}]
  }]
  }

}
