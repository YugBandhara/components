import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { PERMISSION } from 'src/constants/permissions';
import { AuthService } from 'src/core/services/auth.service';
import { NotifyService } from 'src/core/services/notify.service';
import { MessageService } from 'src/core/services/message.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('menuToggler', [
      state('open', style({
        width: '250px',
      })),
      state('closed', style({
        width: '70px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class SidebarComponent implements OnInit {
  currentDate = new Date();
  @Input() menuList: object[] = [];
  @Output() eventEmittedFromAdminSiderbar = new EventEmitter();
  @Output() tabMenu: EventEmitter<any> = new EventEmitter()
  public menuToogleNotify: any;
  public sidebarToggle = false;
  public oldRouteParam = 'dashboard';
  public sidebarVisible= false;
  public routeObservable: any;
  public menuLink: any[] = [];
  public menuObservable: any;
  public dashboardTabElements = {
    allHamburgerTabs: [],
    currentTabSelected: '',
    initializedModuleTab: []
  };
  public activeMenu = '';
  private dataSource = new BehaviorSubject("default message");
  public receiveData = this.dataSource.asObservable();
  // public permissionObj = PERMISSION;

  constructor(
    private renderer: Renderer2,
    private notify: NotifyService,
    private router: Router,
    public authService: AuthService,
    public messageService: MessageService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {
      const menuLink = [
        { id: 'dashbaord', icon: 'fa fa-desktop', name: 'Dashboard', label: 'Dashboard', is_closable: true, routerLink: ['/Ecommerce/dashboard']}
      ];
      menuLink.forEach((menu: any) => {
        // if (this.authService.hasElementPermission(menu.permissionName)) {
          this.menuLink.push(menu);
        // }
      });
      this.menuToogleNotify = this.notify.notifyMenuToggleObservable$.subscribe(res => {
        if (res) {
          this.sidebarToggle = res.sidebar;
        }
      });
      this.menuToogleNotify = this.notify.notifyMenuToggleObservable$.subscribe(res => {
        if (res) {
          this.sidebarToggle = res.sidebar;
        }
      });
  }

  redirectMaster() {
    this.router.navigate(['/dashboard']);
  }
  closeCallback(){
    this.sidebarVisible=false
  }

  collapseList() {
    const result = document.getElementsByClassName("sidebar-nav-wrapper");
    this.notify.returnflag(this.sidebarToggle)
    this.sidebarToggle = !this.sidebarToggle;
    this.notify.notifyToggleMenu({ sidebar: this.sidebarToggle });
  }
}
