import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoadingComponent} from "../share/components/loading/loading.component";
import 'bootstrap/dist/css/bootstrap.min.css';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, LoadingComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }


}
