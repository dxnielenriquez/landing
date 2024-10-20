import {Component, HostListener, OnInit} from '@angular/core';
import {PrimeModule} from "../../prime/prime.module";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimeModule, MenubarModule, OverlayPanelModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  isMobileView = true;
  username = '';

  constructor(
  ) {

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileView();
  }

  ngOnInit() {
    this.checkMobileView();
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/home/dashboard'
      },
      {
        label: 'Management',
        icon: 'pi pi-spin pi-cog',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-user',
            routerLink: '/management/users'
          },
        ]
      },
    ];
  }

  checkMobileView() {
    this.isMobileView = window.innerWidth <= 960;
  }


}
