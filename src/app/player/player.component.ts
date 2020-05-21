import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent {
  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "You" }
  ];
  state;
  currentFile: any = {};

  constructor (
    private audioService: AudioService,
    private songsService: SongsService
  ) {
    // get media files
    // songsService.getFiles().subscribe(files => {
    //   this.files = files;
    // });
    songsService.getFiles().subscribe(files => {
      console.log(files)
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.songUrl);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  
}

