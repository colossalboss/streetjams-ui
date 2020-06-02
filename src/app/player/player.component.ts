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
  files: Array<any>;

  songs: Array<any> = [
    // tslint:disable-next-line: max-line-length
    {
      songUrl:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      songTitle: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      songUrl:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
        songTitle: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      songUrl:
        "https://ia801503.us.archive.org/15/items/TheBeatlesPennyLane_201805/The%20Beatles%20-%20Penny%20Lane.mp3",
        songTitle: "Penny Lane",
      artist: "The Beatles"
    }
  ];

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
      // this.songs = files;

      if (files.length > 0) {
        files.forEach(file => {
          this.songs.push(file);
        });
      }
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
    // this.songsService.getFiles().subscribe(res => {
    //   this.files = res;
    // });
    this.files = this.songs;
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
    return this.currentFile?.index === this.files?.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}

