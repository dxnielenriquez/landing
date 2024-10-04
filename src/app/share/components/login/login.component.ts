import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ShareModule} from "../../share.module";
import {ToastModule} from "primeng/toast";
import {PrimeModule} from "../../prime/prime.module";
import {NavbarComponent} from "../navbar/navbar.component";
import {ServicesComponent} from "../../../pages/services/services.component";
import {FooterComponent} from "../footer/footer.component";
import {PortafolioComponent} from "../../../pages/portafolio/portafolio.component";
import {AboutComponent} from "../../../pages/about/about.component";
import {TeamComponent} from "../../../pages/team/team.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, ShareModule, ToastModule, NavbarComponent, ServicesComponent, FooterComponent, PortafolioComponent, AboutComponent, TeamComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({
      email: ['depasie2019@gmail.com', [Validators.required, Validators.email]],
      password: ['secret', [Validators.required]],
    });
  }

  ngOnInit(): void {}
}
