import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotifyService } from 'src/core/services/notify.service';
import { AuthService } from 'src/core/services/auth.service';
import { MessageCodes, MessageCodesComparator } from 'src/core/enums/message-codes.enum';
import { UserDeviceService } from 'src/core/services/user-device.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { MastersService } from 'src/core/services/masters.service';
import { MessageService } from 'src/core/services/message.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/core/services/util.service';
import { image } from './ImageUrl';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('openMenu', style({
        width: '250px',
      })),
      state('closeMenu', style({
        width: '70px',
      })),
      transition('openMenu => closeMenu', [
        animate('0.3s')
      ]),
      transition('closeMenu => openMenu', [
        animate('0.3s')
      ]),
    ]),
    trigger('openCloseTabBar', [
      state('openMenuTabBar', style({
        width: 'calc(100vw - 550px)',
      })),
      state('closeMenuTabBar', style({
        width: 'calc(100vw - 450px)',
      })),
      transition('openMenuTabBar => closeMenuTabBar', [
        animate('0.3s')
      ]),
      transition('closeMenuTabBar => openMenuTabBar', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  displayBasic!: boolean;
  public sidebarToggle: boolean = false;
  public userLoginName: any;
  public searchVal: any;
  public logoutPopUp = false;
  public changePassword = false;
  public changePasswordObj: any = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  public validateMessage: any;
  public validatePasswordFormat:any;
  public sampleImgurl:any;


  constructor(
    private NotifyService: NotifyService,
    private authservice: AuthService,
    private userDeviceService: UserDeviceService,
    private primengConfig: PrimeNGConfig,
    private mastersService: MastersService,
    public messageService: MessageService,
    public router: Router,
    public utilService: UtilService,
    private sanitizer: DomSanitizer

  ) { }
  public items!: MenuItem[];
  public selectedLanguage:any;
  public selectedCurrency:any;
  public Languages:any=[];
  public Currencies:any=[];
  public SearchedProduct:any;
 
  ngOnInit() {
    // this.sampleImgurl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+image);

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  ];
  this.Languages=[
    {name: 'English', },
      {name: 'French',},
  ]
  this.Currencies=[{
    name:"CAD $"
  },
  {
    name:"USD $"
  },
]
    this.primengConfig.ripple = true;
    this.userLoginName = this.authservice.getAuthLoginName();
  }

  showDialog() {
    this.logoutPopUp = true;
  }

  collapseList() {
    const result = document.getElementsByClassName("sidebar-nav-wrapper");
    this.NotifyService.returnflag(this.sidebarToggle)
    this.sidebarToggle = !this.sidebarToggle;
    this.NotifyService.notifyToggleMenu({ sidebar: this.sidebarToggle });
  }

  logoutUserOut() {
    const localStorageLoginName = this.authservice.getStringFromLocalStorage('login-name');
    const login_name = localStorageLoginName;
    const getToken = this.authservice.getStringFromLocalStorage(login_name + '-auth-token');
    if (getToken !== null && this.authservice.token === null) {
      this.authservice.token = getToken;
    }
    this.NotifyService.notifyPrePlanCombosData({ updateStatus: true });
    this.authservice.logoutUser().subscribe(res => {
      if (!res.error_status && MessageCodesComparator.AreEqual(res.code, MessageCodes.VALET_MS_OK_200)) {
      //   let payload ={
      //     "user_code":this.authservice.getUserId().toString(),
      //     "login_name": this.authservice.getAuthLoginName(),
      //     "token":this.authservice.getToken(),
      //     "logout_datetime":new Date().toISOString(),
      //     "is_forced_logout":true
      // }
    //     this.authservice.logoutHistory().subscribe(res => {
    //   if (!res.error_status && MessageCodesComparator.AreEqual(res.code, MessageCodes.GLOBAL_AUDIT_MS_CREATED_201)) {
    //   }
    //     }, err => {this.messageService.showErrorGrowlMessage('SERVER_ERROR_OCCURRED') })
        this.authservice.destroyUserSession();
        this.userDeviceService.clearLocalDeviceData();
      }
    }, err => { });
  }

  showChangePasswordDialog() {
    this.changePassword = true;
  }
  
  close() { 
    this.changePasswordObj.oldPassword = ''
    this.changePasswordObj.newPassword = ''
    this.changePasswordObj.confirmPassword = ''
    this.validateMessage = ''
    this.validatePasswordFormat = ''
   }

  submitPassword(event: any) {
  }

  Validation() {
    this.validateMessage = ""
  }

  preventKey(event: any) {
    if (event.keyCode == 32) {
      event.preventDefault()
    }
  }

  validatePassword(password:any){
    let mailformat =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/
    password.match(mailformat) || password == '' ? this.validatePasswordFormat = '': this.validatePasswordFormat = 'Password Must contain a digit,alphabet and special characters.';
  }
}