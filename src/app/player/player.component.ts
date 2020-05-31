import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';
import { SongsService } from '../songs.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "Me" }
  ];
  songs: Array<any>;
  form;
  state;
  currentFile: any = {};

  constructor (
    public audioService: AudioService,
    private songsService: SongsService,
    private fb: FormBuilder
  ) {
    // get media files
    // songsService.getFiles().subscribe(files => {
    //   this.files = files;
    // });
    songsService.getFiles().subscribe(files => {
      console.log(files)
      this.songs = files;
      this.files = this.songs;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });

    this.form = this.fb.group({
      query: ''
    })
  }

  ngOnInit() {
    // this.files = this.songs;
  }

  getAllSongs() {
    this.songsService.getFiles().subscribe(res => this.files = res);
  }

  onClick(event) {
    console.log(event);
    event.srcElement.classList.remove("hidden");
  }

  onChanged(event) {
    console.log("Changed");
    if (event.srcElement.value !== "") {
      this.files = this.songs.filter(song => song.songTitle.toLowerCase().includes(event.srcElement.value.toLowerCase()) || song.artist.toLowerCase().includes(event.srcElement.value.toLowerCase()));
    } else {
      this.files = this.songs;

    }
  }

  onDone(event) {
    console.log("Done");
    event.srcElement.value = ""    
    event.srcElement.classList.add("hidden")
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

