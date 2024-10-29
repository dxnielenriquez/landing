import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

interface CardData {
  imgSrc: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  cardsData: CardData[] = [
    {
      imgSrc: 'assets/images/info.png',
      title: 'Información oportuna',
      text: 'Dispondrá de información sobre el seguimiento de la capacitación e integración de funcionarios de casilla, permitiendo un mejor desempeño del personal eliminando la desconfianza ciudadana hacia el órgano electoral.'
    },
    {
      imgSrc: 'assets/images/experiencia.png',
      title: 'Experiencia',
      text: 'Personal con amplia experiencia en procesos electorales y soporte tecnológico de alta seguridad que le garantiza rapidez en el procesamiento de información, evitando contingencias o vulnerabilidad en el sistema.'
    },
    {
      imgSrc: 'assets/images/monitoreo.png',
      title: 'Monitoreo',
      text: 'Mecanismos de monitoreo con disponibilidad de la información generada por los consejos distritales y/o municipales permitiendo un flujo continuo de resultados con total transparencia, lo que evita desconfianza en la opinión pública.'
    },
    {
      imgSrc: 'assets/images/disponibilidad.png',
      title: 'Disponibilidad',
      text: 'Aseguramos la disponibilidad en un 99.99 % del sistema PREP, con mecanismos que protegen y agilizan los procesos de generación de resultados electorales preliminares, evitando conflictos con los partidos y el descontento social en general.'
    },
    {
      imgSrc: 'assets/images/participacion.png',
      title: 'Mayor Participación',
      text: 'Incrementamos el nivel de participación ciudadana en la jornada electoral, con tecnología de fácil consulta que permite conocer la ubicación de las casillas.'
    },
    {
      imgSrc: 'assets/images/archivo.png',
      title: 'Archivo Histórico',
      text: 'Facilitamos el acceso electrónico al archivo documental de elecciones anteriores para la generación de consultas de información, mejorando tiempos de respuesta y cumpliendo con la Ley de Acceso a la Información.'
    },
    {
      imgSrc: 'assets/images/garantia.png',
      title: 'Garantía',
      text: 'Garantizamos la publicación e integración del PREP en menos de una hora, permitiendo la transmisión de los resultados, eliminando la tensión o desconfianza entre los partidos políticos y la ciudadanía.'
    },
    {
      imgSrc: 'assets/images/transparencia.png',
      title: 'Transparencia',
      text: 'Transparentamos la contratación y manejo de medios de comunicación, para asegurar la equidad entre partidos políticos y el seguimiento adecuado de los gastos de campaña.'
    },
    {
      imgSrc: 'assets/images/analisis.png',
      title: 'Análisis Oportuno',
      text: 'Analizamos oportunamente la información de candidatos y representantes, para informar en tiempo a los partidos sobre la aceptación o rechazo de sus propuestas, evitando duplicidad, errores de captura o retrasos.'
    },
    {
      imgSrc: 'assets/images/admon.png',
      title: 'Administración y Sistematización',
      text: 'Administramos y sistematizamos todas las etapas de los concursos que promueve el Instituto Electoral, facilitando la evaluación del jurado a distancia, permitiendo disminuir costos, evitar errores y procesar e informar oportunamente.'
    }
  ];

  activeCardIndex: number | null = null;

  toggleCard(index: number | null) {
    this.activeCardIndex = this.activeCardIndex === index ? null : index;
  }

  closeCard() {
    this.activeCardIndex = null;
  }
}
