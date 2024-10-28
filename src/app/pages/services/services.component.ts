import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import * as d3 from 'd3';
import {geoPath} from 'd3';
import {Modal} from "bootstrap";

interface VotacionRegion {
  listaVotacion: VotacionData[];
  resumenVotacion?: TotalesVotos;
}

interface TotalesVotos {
  acumulados: TotalItem;
  nulos: TotalItem;
  noRegistrados: TotalItem;
  total: TotalItem;
}

interface TotalItem {
  value: any;
  percentage: number;
}

interface VotacionData {
  regiones?: Territorio[]
  votos?: number,
  porcentaje?: number,
  ganador?: boolean,
  color?: string,
  partidos?: PartidoItem[]
}

interface PartidoItem {
  idPartidos?: string,
  color?: string,
  logo?: string
}

interface Territorio {
  ID?: string;
  nombre?: string;
  tipo?: string
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @Input() mapData: VotacionRegion | undefined;
  @ViewChild('map') mapContainerHtmlElement: ElementRef | undefined;
  @ViewChild('painter') svgHtmlElement: ElementRef | undefined;
  @Input() srcGeoJson: any;
  svgMap: any;
  @Input() disabled = false;
  lastWidth = 0;
  @Input() territoriosSelected: Territorio[] | Territorio | undefined;
  filterSvgWin: any;
  selectedRegion: any = null;
  estados = [
    {
      id: 30,
      nombre: 'Veracruz',
      logo: 'assets/images/estadosLogos/veracruz.svg',
      anos: ['2024'],
      color: '#843fa5'
    },
    {
      id: 29,
      nombre: 'Tlaxcala',
      logo: 'assets/images/estadosLogos/tlaxcala.svg',
      anos: ['2024'],
      color: '#843fa5'
    },
    {
      id: 26,
      nombre: 'Sonora',
      logo: 'assets/images/estadosLogos/sonora.png',
      anos: ['2015', '2018', '2021', '2024'],
      color: '#843fa5'
    },
    {
      id: 25,
      nombre: 'Sinaloa',
      logo: 'assets/images/estadosLogos/sinaloa.png',
      anos: ['2001', '2004', '2007', '2010', '2011', '2013', '2018', '2021', '2024'],
      color: '#843fa5'
    },
    {
      id: 18,
      nombre: 'Nayarit',
      logo: 'assets/images/estadosLogos/nayarit.png',
      anos: ['2021', '2024'],
      color: '#843fa5'
    },
    {
      id: 28,
      nombre: 'Campeche',
      logo: 'assets/images/estadosLogos/campeche.svg',
      anos: ['2024'],
      color: '#843fa5'
    },
    {
      id: 10,
      nombre: 'Durango',
      logo: 'assets/images/estadosLogos/durango.png',
      anos: ['2021', '2022', '2024'],
      color: '#843fa5'
    },
    {
      id: 12,
      nombre: 'Guerrero',
      logo: 'assets/images/estadosLogos/guerrero.png',
      anos: ['2018', '2024'],
      color: '#843fa5'
    },
    {
      id: 17,
      nombre: 'Morelos',
      logo: 'assets/images/estadosLogos/morelos.png',
      anos: ['2018', '2021'],
      color: '#843fa5'
    },
    {
      id: 16,
      nombre: 'Michoacan',
      logo: 'assets/images/estadosLogos/michoacan.png',
      anos: ['2021'],
      color: '#843fa5'
    }
  ];
  private modalInstance: Modal | undefined;

  ngOnInit(): void {
  }

  public drawMap(): void {
    const width = 610;
    const height = 475;

    d3.json('./assets/mapa/mexico-e.json')
      .then((data: any) => {
        const projection = d3.geoIdentity().reflectY(true).scale(50).fitExtent([[0, 10], [width, height]], data);
        const pathBuilder = geoPath().projection(projection);

        this.svgMap.selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('id', (d: any) => `region-${d.properties.NUM_EDO}`)
          .attr('d', pathBuilder)
          .style('fill', '#D6B4FC')
          .style('stroke', '#0a090a')
          .style('stroke-width', '1.5px')
          .on('click', (event: any, d: any) => this.toggleRegion(d));

        this.estados.forEach(estado => {
          const path = this.svgMap.select(`#region-${estado.id}`);
          if (!path.empty()) {
            path.style('fill', estado.color)
              .style('cursor', 'pointer');
          }
        });
      })
      .catch(err => console.error("Error loading GeoJSON data:", err));
  }

  showModal(): void {
    const modalElement = document.getElementById('regionModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error("No se encontró el elemento modal");
    }
  }

  toggleRegion(regionData: any): void {
    const regionId = Number(regionData.properties.NUM_EDO);
    const selected = this.estados.find(estado => estado.id === regionId);

    if (selected) {
      this.selectedRegion = selected;
      console.log(selected)
      this.showModal();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const modalDialog = document.querySelector('.modal-dialog');
    const isOutsideClick = modalDialog && !modalDialog.contains(event.target as Node);

    if (isOutsideClick && this.modalInstance) {
      this.modalInstance.hide();
    }
  }


  ngAfterViewInit(): void {
    this.svgMap = d3.select(this.svgHtmlElement!.nativeElement)
      .attr('width', '800%')
      .attr('viewBox', `0 0 610 700`)
      .append('g');

    this.createFilter();
    this.drawMap();
    this.mapSizeChange();

    d3.select(window).on('resize', this.mapSizeChange.bind(this));
  }


  private mapSizeChange(): void {
    const containerSvg = this.mapContainerHtmlElement!.nativeElement;
    const boxSvg = this.svgHtmlElement!.nativeElement;
    const widthContainer = containerSvg.offsetWidth;

    if (this.lastWidth === widthContainer) return;

    this.lastWidth = widthContainer;
    const isMobile = window.innerWidth < 768;

    // aqui muevo el mapa a proporcion
    const scaleValue = isMobile ? widthContainer / 550 : widthContainer / 1150;
    this.svgMap.attr('transform', `scale(${scaleValue})`);

    // ajuste para los moviles
    const height = isMobile ? widthContainer * 0.6 : widthContainer * 0.5;
    boxSvg.setAttribute('height', `${height}`);
  }


  private createFilter(): void {
    this.filterSvgWin = this.svgMap.append('defs')
      .append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%')
      .attr('width', '130%');

    this.filterSvgWin.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 5)
      .attr('result', 'blur');

    this.filterSvgWin.append('feOffset')
      .attr('in', 'blur')
      .attr('result', 'offsetBlur');

    const feMerge = this.filterSvgWin.append('feMerge');

    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }

}
