import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  items!: MenuItem[];
  public typeOfCategory:any=""
  ngOnInit(): void {
    this.items = [
      {
          label: 'File',
          items: [
              {
                  label: 'New',
                  //         items: [
                  //     {
                  //         label: 'Bookmark',
                  //                        },
                  //     {
                  //         label: 'Video',
                  //                     }
                  // ]
              },
              {
                  label: 'Delete',
                      },
              {
                  separator: true
              },
              {
                  label: 'Export',
                              }
          ]
      },
      {
          label: 'Edit',
            items: [
              {
                  label: 'Left',
                           },
              {
                  label: 'Right',
                            },
              {
                  label: 'Center',
                             },
              {
                  label: 'Justify',
                              }
          ]
      },
      {
          label: 'Users',
          items: [
              {
                  label: 'New',
                          },
              {
                  label: 'Delete',
                           },
              {
                  label: 'Search',
                  //          items: [
                  //     {
                  //         label: 'Filter',
                  //                           items: [
                  //             {
                  //                 label: 'Print',
                  //                                     }
                  //         ]
                  //     },
                  //     {
                  //                         label: 'List'
                  //     }
                  // ]
              }
          ]
      },
      {
          label: 'Events',
              items: [
              {
                  label: 'Edit',
                  //           items: [
                  //     {
                  //         label: 'Save',
                  //                             },
                  //     {
                  //         label: 'Delete',
                  //                              }
                  // ]
              },
              {
                  label: 'Archieve',
                  //                   items: [
                  //     {
                  //         label: 'Remove',
                  //                              }
                  // ]
              }
          ]
      },
      {
          label: 'Quit',
          }
  ];
}
openDialogue(event: any){
  console.log(event)
}
settypeOfType(typeName:any){
  this.typeOfCategory=typeName

}
onfocused(event:any){
  console.log("yesss")
}
  

}
