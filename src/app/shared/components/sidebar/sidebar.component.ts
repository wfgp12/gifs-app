import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifService: GifService){
  }

  searchGif(input : string): void {
    this.gifService.searchTag(input);
  }

  get tagList(): string[] {
    return this.gifService.tagHistory;
  }
}
