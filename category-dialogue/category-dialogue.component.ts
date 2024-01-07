import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-dialogue',
  templateUrl: './category-dialogue.component.html',
  styleUrls: ['./category-dialogue.component.scss']
})
export class CategoryDialogueComponent implements OnInit {
  public showCatgeory: boolean=false;
  public showMenCatgeory: boolean=false;
  public showWomenCatgeory: boolean=false;

  constructor() { }
  @Input() type = '';
  public products: any = []
  ngOnInit(): void {
    this.checkCategoryType()
    this.products = [{
      code: 'fgygysj',
      name: 'yug',
      category: "khakuja",
      quantity: 70
    }]
  }
  checkCategoryType(){
    if (this.type == 'Category'){
      this.showCatgeory =true
      this.showMenCatgeory=false
      this.showWomenCatgeory=false
    }
    else if(this.type=='men'){
      this.showCatgeory =false
      this.showMenCatgeory=true
      this.showWomenCatgeory=false
    }
    else{
      
        this.showCatgeory =false
        this.showMenCatgeory=false
        this.showWomenCatgeory=true
      
    }
  }


}
