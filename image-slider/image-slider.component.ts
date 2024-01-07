import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  constructor() { }
  public Offers:any=[];

	public responsiveOptions:any;

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      { 
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  this.Offers=[
    {
      imageSrc:'../../../assets/images/banner1.jpeg'
    },
    {
      imageSrc:'../../../assets/images/banner2.jpeg'
    }
  ]
  }

}
