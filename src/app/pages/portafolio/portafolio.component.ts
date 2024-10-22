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
  activeTab: string = 'preElectoral';
  tabTitle: string = 'PRE ELECTORAL';
  tabContent: string = `
    Consolidamos la información estatal en cada una de las etapas del proceso electoral,
    ofreciendo la oportunidad de evaluar con prontitud y exactitud el desarrollo del proceso.
  `;

  changeContent(tab: string) {
    this.activeTab = tab;

    if (tab === 'preElectoral') {
      this.tabTitle = 'PRE ELECTORAL';
      this.tabContent = `
        Consolidamos la información estatal en cada una de las etapas del proceso electoral,
        ofreciendo la oportunidad de evaluar con prontitud y exactitud el desarrollo del proceso.
      `;
    } else if (tab === 'postElectoral') {
      this.tabTitle = 'POST ELECTORAL';
      this.tabContent = `
        Evaluamos los resultados del proceso electoral, asegurando la transparencia y precisión
        de la información presentada.
      `;
    } else if (tab === 'evaluacion') {
      this.tabTitle = 'EVALUACIÓN';
      this.tabContent = `
        Realizamos una evaluación integral de todo el proceso, identificando áreas de mejora
        para futuros eventos electorales.
      `;
    }
  }
}
