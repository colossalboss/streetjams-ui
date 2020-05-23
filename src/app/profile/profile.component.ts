import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  songs;
  user;

  constructor(private songsService: SongsService,
     private route: ActivatedRoute,
     private userService: UserService) { 
    
  }

  ngOnInit(): void {

    let id = this.route.snapshot.params.id;

    this.userService.getUser().subscribe(res => {
      console.log(res);
      this.user = res;
    })

    this.songsService.getUserSongs(id).subscribe(res => {
      this.songs = res;
    })
  }

  deleteSong(id) {
    this.songsService.removeSong(id);
  }

}
