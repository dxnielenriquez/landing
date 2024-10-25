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
  showCard = false;
  showCardForce = false;
  lastWidth = 0;
  @Input() territoriosSelected: Territorio[] | Territorio | undefined;
  filterSvgWin: any;
  selectedRegion: any = null;
  private regionSet = false;
  private modalInstance: Modal | undefined;
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
            path.style('fill', estado.color);
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

  public highlightRegion(regionId: string): void {
    const path = this.getPathById(regionId);
    if (path && !path.empty()) {
      path.style('fill', 'blue');
    }
  }

  public resetRegion(regionId: string): void {
    const path = this.getPathById(regionId);
    if (path && !path.empty()) {
      path.style('fill', 'rgb(204, 204, 204)');
    }
  }

  getPathById(idTerritorio: any) {
    return this.svgMap.select(`#region-${idTerritorio}`);
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


  private createCardClickListener(): void {

    d3.select('body').on('click', (event) => {
      const regiones = d3.selectAll('.region');
      const nodes = d3.selectAll('.region').nodes();

      const outside = regiones.filter((data, i) => {
        return nodes[i] === (event.target);
      }).empty();

      if (outside) {
        this.showCard = false;
        this.showCardForce = false;
        this.regionSet = false;
        this.disableHighlight();
      }
    });
  }

  private disableHighlight(): void {
    this.svgMap.selectAll('.region')
      .classed('region-highlight', false);

    this.svgMap.selectAll('.region')
      .classed('region-selected-highlight', false)
      .attr('filter', null);
  }

  private mapSizeChange(): void {
    const containerSvg = this.mapContainerHtmlElement!.nativeElement;
    const boxSvg = this.svgHtmlElement!.nativeElement;
    const widthContainer = containerSvg.offsetWidth;

    if (this.lastWidth === widthContainer) return;

    this.lastWidth = widthContainer;
    const isMobile = window.innerWidth < 768;

    // Escala proporcional adaptativa
    const scaleValue = isMobile ? widthContainer / 300 : widthContainer / 1150;
    this.svgMap.attr('transform', `scale(${scaleValue})`);

    // Ajuste de altura para asegurar proporción en móviles
    const height = isMobile ? widthContainer * 0.6 : widthContainer * 0.5;
    boxSvg.setAttribute('height', `${height}`);
  }



  private paintMapByData(): void {
    if (!this.mapData || !this.mapData.listaVotacion) {
      console.error("mapData or listaVotacion is undefined");
      return;
    }

    this.mapData.listaVotacion.forEach(votacion => {
      votacion.regiones?.forEach(region => {
        const regionNode = this.svgMap.select(`#region-${region.ID}`);
        if (!regionNode.empty()) {
          regionNode.style('fill', votacion.color);
          regionNode.classed('region-con-ganador', true);

          Object.assign(regionNode.datum(), {
            dataRegion: {
              ID: region.ID,
              Votos: votacion.votos,
              Partidos: votacion.partidos,
              Color: votacion.color
            }
          });
        }
      });
    });
  }

  private highlightSingleSelected(idPath: any): void {

    this.svgMap.selectAll('.region')
      .classed('region-highlight', true);

    const pathWinner = this.getPathById(idPath);
    pathWinner.raise();
    pathWinner.classed('region-selected-highlight', true)
      .attr('filter', 'url(#drop-shadow)');
  }

  private highlightMultipleSelected(territorios: Territorio[] | Territorio): void {

    if (!Array.isArray(territorios)) {
      this.highlightSingleSelected(territorios.ID);
      return;
    }

    const regiones = this.svgMap.selectAll('.region');
    regiones.classed('region-selected-highlight', false)
      .attr('filter', null);

    if (territorios.length == 0) {
      regiones.classed('region-highlight', false);
      return;
    }

    regiones.classed('region-highlight', true);

    territorios.forEach(ter => {
      const pathWinner = this.getPathById(ter.ID);
      pathWinner.classed('region-selected-highlight', true)
        .attr('filter', 'url(#drop-shadow)');
    });
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
