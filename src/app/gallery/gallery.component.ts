import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  artists;

  constructor(private songsService: SongsService) { 
    this.getArtist();
  }

  ngOnInit(): void {
    this.getArtist();
  }

  getArtist() {
    this.songsService.getArtist().subscribe(res => {
      console.log(res)
      this.artists = res
    }); 
  }

}
