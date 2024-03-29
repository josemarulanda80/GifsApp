import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private giftServices: GifsService) {
  }


  ngOnInit(): void {

  }
  get historial(): string[] {
    return this.giftServices.historial;
  }
  buscar(item: string) {
    return this.giftServices.buscarGifs(item)
  }
}
