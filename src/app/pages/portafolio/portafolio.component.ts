import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {

}
