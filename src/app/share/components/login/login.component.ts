import {Component, OnInit} from '@angular/core';
import {ShareModule} from "../../share.module";
import {ToastModule} from "primeng/toast";
import {PrimeModule} from "../../prime/prime.module";
import {NavbarComponent} from "../navbar/navbar.component";
import {ServicesComponent} from "../../../pages/services/services.component";
import {FooterComponent} from "../footer/footer.component";
import {PortafolioComponent} from "../../../pages/portafolio/portafolio.component";
import {AboutComponent} from "../../../pages/about/about.component";
import {TeamComponent} from "../../../pages/team/team.component";
import {ContactComponent} from "../../../pages/contact/contact.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, ShareModule, ToastModule, NavbarComponent, ServicesComponent, FooterComponent, PortafolioComponent, AboutComponent, TeamComponent, ContactComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
