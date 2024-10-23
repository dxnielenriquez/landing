import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {count} from "rxjs";


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  isModalOpen: boolean = false;

  fechas = [
    {
      fecha: '2001',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2001',
          texto: `Dr. Rigoberto Alcantar Elección de Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: '',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2004',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2004',
          texto: `Dr. Rigoberto Alcantar\n\n Elección de Gobernador, Ayuntamientos y Diputados Locales\n\n • SOCE - Sistema para la Organización y Capacitación Electoral.\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2004-sinaloa.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2007',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2007',
          texto: `Lic. Juliana Araujo\n\n Elección de Ayuntamientos y Diputados Locales\n\n• SOCE - Sistema para la Organización y Capacitación Electoral.\n\n• PREP - Programa de Resultados Electorales Preliminares.\n\n• SIAM - Sistema de Información de Acceso a Medios.`,
          reconocimiento: 'assets/images/reconocimientos/2007-sinaloa.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2010',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2010',
          texto: `Lic. Juliana Araujo\n\nElección de Gobernador, Ayuntamientos y Diputados Locales\n\n• SOCE - Sistema para la Organización y Capacitación Electoral.\n\n• PREP - Programa de Resultados Electorales Preliminares.\n\n• SIAM - Sistema de Información de Acceso a Medios.\n\n• ISE - Innovación y Servicios Electorales.`,
          reconocimiento: 'assets/images/reconocimientos/2010-sinaloa.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2011',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2011',
          texto: `Lic. Juliana Araujo \n\n • DigiElect - Solución para la Digitalización y Presentación de las Actas de la Elección.\n\n• SIAM - Sistema de Información de Acceso a Medios.`,
          reconocimiento: '',
          sitio_web: ''
        },
        {
          logo: 'assets/images/estadosLogos/michoacan.png',
          titulo: 'MICHOACÁN 2011',
          texto: `Lic. María de los Ángeles Llanderal\n\n Elección de Ayuntamientos y Diputados Locales\n\n• SIJE - Sistema de Inicio de la Jornada Electoral Móvil.`,
          reconocimiento: 'assets/images/reconocimientos/2012-michoacan.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2013',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2013',
          texto: `Lic. Jacinto Pérez\n\nElección de Ayuntamientos y Diputados Locales\n\n• SIIE - Solución Integral de Información Electoral (SOE, PREP, SIJE, DigiElect, Mesa de Ayuda, Infraestructura.`,
          reconocimiento: 'assets/images/reconocimientos/2013-sinaloa.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2015',
      preps: [
        {
          logo: 'assets/images/estadosLogos/sonora.png',
          titulo: 'SONORA 2015',
          texto: `Lic. Guadalupe Taddei Zavala\n\nElección de Ayuntamientos y Diputados Locales\n\n• PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2015-sonora.pdf',
          sitio_web: ''
        }
      ]
    },
    {
      fecha: '2018',
      preps: [
        {
          logo: 'assets/images/estadosLogos/guerrero.png',
          titulo: 'GUERRERO 2018',
          texto: `C. Pedro Pablo Martínez\n\nElección de Ayuntamientos y Diputados Locales\n\n• PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2018-guerrero.pdf',
          sitio_web: ''
        },
        {
          logo: 'assets/images/estadosLogos/morelos.png',
          titulo: 'MORELOS 2018',
          texto: `M. en C. Ana Isabel León\n\nElección de Gobernador, Ayuntamientos y Diputados Locales\n\n• PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2018-morelos.pdf',
          sitio_web: 'https://prep2018.impepac.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2018',
          texto: `Lic. Karla Peraza\n\nElección de Ayuntamientos y Diputados Locales\n\n• PREP - Programa de Resultados Electorales Preliminares.\n\n• CÓMPUTOS - Cómputos Finales.`,
          reconocimiento: 'assets/images/reconocimientos/2018-sinaloa.pdf',
          sitio_web: 'https://www.ieesinaloa.mx/prepsinaloa2018'
        },
        {
          logo: 'assets/images/estadosLogos/sonora.png',
          titulo: 'SONORA 2018',
          texto: `Lic. Guadalupe Taddei Zavala\n\nElección de Ayuntamientos y Diputados Locales\n\n• PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2018-sonora.pdf',
          sitio_web: 'http://prep2018-son.ieesonora.org.mx/'
        }
      ]
    },
    {
      fecha: '2021',
      preps: [
        {
          logo: 'assets/images/estadosLogos/durango.png',
          titulo: 'DURANGO 2021',
          texto: `M.D. Roberto Herrera Hernández\n\n Elección de Diputados Localesn\n\n • PREP - Programa de Resultados Electorales Preliminares.\n\n • CÓMPUTOS - Cómputos Finales.`,
          reconocimiento: 'assets/images/reconocimientos/2021-durango.pdf',
          sitio_web: 'https://www.prepdurango2021.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/morelos.png',
          titulo: 'MORELOS 2021',
          texto: `Mtra. Mireya Gally Jordá\n\n Elección de Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2021-morelos.pdf',
          sitio_web: 'https://www.prep2021mor.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/nayarit.png',
          titulo: 'NAYARIT 2021',
          texto: `Mtro. José Francisco Cermeño Ayón\n\n Elección de Gubernatura, Ayuntamientos, Regidurías y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2021-nayarit.pdf',
          sitio_web: 'https://www.prepnayarit2021.com/'
        },
        {
          logo: 'assets/images/estadosLogos/nayarit.png',
          titulo: 'NAYARIT 2021',
          texto: `Mtro. José Francisco Cermeño Ayón\n\n Elección Extraordinaria del municipio de La Yesca\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2021-nayarit-ext.pdf',
          sitio_web: 'https://ext.prepnayarit2021.com/'
        },
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2021',
          texto: `Lic. Karla Peraza\n\n Elección de Gubernatura, Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.\n\n  • CÓMPUTOS - Cómputos Finales.`,
          reconocimiento: 'assets/images/reconocimientos/2021-sinaloa.pdf',
          sitio_web: ''
        },
        {
          logo: 'assets/images/estadosLogos/sonora.png',
          titulo: 'SONORA 2021',
          texto: `Lic. Guadalupe Taddei Zavala\n\n Elección de Gubernatura, Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2021-sonora.pdf',
          sitio_web: 'https://2021.prepsonora.org.mx/'
        }
      ]
    },
    {
      fecha: '2022',
      preps: [
        {
          logo: 'assets/images/estadosLogos/durango.png',
          titulo: 'DURANGO 2021',
          texto: `M.D. Roberto Herrera Hernández\n\n Elección de Gubernatura y Ayuntamientos\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/2022-durango.pdf',
          sitio_web: 'https://www.prepdurango2022.mx/'
        }
      ]
    }

    ,
    {
      fecha: '2024',
      preps: [
        {
          logo: 'assets/images/estadosLogos/campeche.svg',
          titulo: 'CAMPECHE 2024',
          texto: `Mtro. Juan Carlos Mena Zapata.\n\n Elección de Ayuntamientos, Diputados Locales y Juntas\n\n • PREP - Programa de Resultados Electorales Preliminares.\n\n • PRECEL - Programa de Resultados Electorales de Cómputo en las Elecciones Locales.`,
          reconocimiento: '',
          sitio_web: 'https://www.prepcampeche2024.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/durango.png',
          titulo: 'DURANGO 2024',
          texto: `M.D. Roberto Herrera Hernández\n\n Elección de Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: '',
          sitio_web: 'https://www.prepdurango2024.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/guerrero.png',
          titulo: 'GUERRERO 2024',
          texto: `Mtra. Luz Fabiola Matildes Gama\n\n Elección de Ayuntamientos y Diputados Locales\n\n • Consultoría - Acompañamiento y Soporte en la Implementación y Operación de los Módulos PREP.`,
          reconocimiento: '',
          sitio_web: 'https://www.prepguerrero.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/morelos.png',
          titulo: 'MORELOS 2024',
          texto: `Mtra. Mireya Gally Jordá\n\n Elección de Gubernatura, Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/CARTA SATISFACCION MORELOS.pdf',
          sitio_web: 'https://www.prep2024mor.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/nayarit.png',
          titulo: 'NAYARIT 2024',
          texto: `Dra. María José Torres Hernández\n\n Elección de Presidencia y Sindicatura, Regidurías y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/CARTA SATISFACCION NAYARIT.pdf',
          sitio_web: 'https://www.prepnayarit2024.com/'
        },
        {
          logo: 'assets/images/estadosLogos/sinaloa.png',
          titulo: 'SINALOA 2024',
          texto: `Lic. Arturo Fajardo Mejía\n\n Elección de Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares\n\n • CÓMPUTOS - Cómputos Finales.`,
          reconocimiento: '',
          sitio_web: 'https://www.prep2024-sin.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/sonora.png',
          titulo: 'SONORA 2024',
          texto: `Mtro. Nery Ruiz Arvizu\n\n Elección de Ayuntamientos y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: 'assets/images/reconocimientos/CARTA SATISFACCION SONORA',
          sitio_web: 'https://www.prepsonora.org.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/tlaxcala.svg',
          titulo: 'TLAXCALA 2024',
          texto: `Lic. Emmanuel Ávila González\n\n Elección de Ayuntamientos, Diputados Locales y Comunidades\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: '',
          sitio_web: 'https://www.prep2024-tlax.org.mx/'
        },
        {
          logo: 'assets/images/estadosLogos/veracruz.svg',
          titulo: 'VERACRUZ 2024',
          texto: `Dra. Marisol Alicia Delgadillo Morales\n\n Elección de Gubernatura y Diputados Locales\n\n • PREP - Programa de Resultados Electorales Preliminares.`,
          reconocimiento: '',
          sitio_web: 'https://www.prep2024-ver.org.mx/'
        }
      ]
    }
  ];
  dataFecha: any[] = [];


  setData(preps: any) {
    this.dataFecha = preps;
    this.isModalOpen = true;
    setTimeout(() => {
      document.querySelector('.overlay')?.classList.add('show');
    }, 10);
  }

  closeCard() {
    document.querySelector('.overlay')?.classList.remove('show');
    setTimeout(() => {
      this.dataFecha = [];
      this.isModalOpen = false;
    }, 500);
  }

}
