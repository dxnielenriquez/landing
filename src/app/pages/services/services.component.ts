import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import * as d3 from 'd3';
import {geoPath} from "d3";

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

interface TotalItem{
  value: any;
  percentage: number;
}
interface VotacionData {
  regiones?: Territorio[]
  votos?: number,
  porcentaje?: number,
  ganador?:boolean,
  color?:string,
  partidos?:PartidoItem[]
}

interface PartidoItem {
  idPartidos?:string,
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
  private regionSet = false;
  lastWidth = 0;
  @Input() territoriosSelected: Territorio[] | Territorio | undefined;
  filterSvgWin: any;

  ngOnInit(): void {

  }


  public drawMap(): void {
    const width = 1000;
    // const width = 610;
    const height = 475;

    d3.json('./assets/mapa/mexico-e.json')
      .then((data: any) => {
        console.log(data);

        const projection = d3.geoIdentity()
          .reflectY(true)
          .scale(50)
          .fitExtent([[0, 10], [width, height]], data);

        const pathBuilder = geoPath().projection(projection);

        const dataTerritorios = this.svgMap.attr('preserveAspectRatio', 'xMinYMin')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .classed('region', true)
          .attr('id', (data: any) => {
            return `region-${data.properties.ID}`;
          })
          .attr('d', pathBuilder);

        if (!this.disabled){
          dataTerritorios
          // .on('mouseover', this.handleMouseOver.bind(this))
          // .on('mouseout', this.handleMouseOut.bind(this))
          // .on('click', this.clickregion.bind(this));

          this.createCardClickListener();
          //this.createCardHoverListener();
        }

        // Resize Projection
        this.mapSizeChange();
        this.paintMapByData();

        if (this.territoriosSelected){
          this.highlightMultipleSelected(this.territoriosSelected);
        }

      }).catch(err => {});
  }

  ngAfterViewInit(): void {
    // console.log(this.svgMap)
    this.svgMap = d3.select(this.svgHtmlElement!.nativeElement)
      .attr('width', '800%')
      .append('g');

    this.createFilter();
    this.drawMap();

    // this.createCardListener();

    d3.select(window)
      .on('resize', this.mapSizeChange.bind(this));
  }

  private createCardClickListener(): void{

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

  private disableHighlight(): void{
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

    if (this.lastWidth == widthContainer) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Ajustar la escala según el tamaño de la pantalla (más grande en móviles)
    const scaleValue = isMobile ? widthContainer / 1000 : widthContainer / 2200;

    this.svgMap.attr('transform', `scale(${scaleValue})`);
    boxSvg.setAttribute('height', `${widthContainer * (isMobile ? 1.2 : 0.8)}`);
  }


  private paintMapByData(): void {

    this.mapData!.listaVotacion.forEach(votacion => {

      votacion.regiones!.forEach(region => {

        const regionNode = this.svgMap.select(`#region-${region.ID}`);
        regionNode.style('fill', votacion.color);
        regionNode.classed('region-con-ganador', true);

        if (regionNode.empty()){
          return;
        }

        Object.assign(regionNode.datum(), {
          dataRegion: {
            ID: region.ID,
            Votos: votacion.votos,
            Partidos: votacion.partidos,
            Color: votacion.color
          }
        });

      });
    });
  }

  private highlightSingleSelected(idPath: any): void{

    this.svgMap.selectAll('.region')
      .classed('region-highlight', true);

    const pathWinner = this.getPathById(idPath);
    pathWinner.raise();
    pathWinner.classed('region-selected-highlight', true)
      .attr('filter', 'url(#drop-shadow)');
  }
  private highlightMultipleSelected(territorios: Territorio[] | Territorio): void{

    if (!Array.isArray(territorios)){
      this.highlightSingleSelected(territorios.ID);
      return;
    }

    const regiones = this.svgMap.selectAll('.region');
    regiones.classed('region-selected-highlight', false)
      .attr('filter', null);

    if (territorios.length == 0){
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

  getPathById(idTerritorio: any){
    return this.svgMap.select(`#region-${idTerritorio}`);
  }

  private createFilter(): void{
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
