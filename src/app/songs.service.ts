import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class SongsService {
  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        "https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:
        "https://ia801503.us.archive.org/15/items/TheBeatlesPennyLane_201805/The%20Beatles%20-%20Penny%20Lane.mp3",
      name: "Penny Lane",
      artist: "The Beatles"
    }
  ];

  constructor(private http: HttpClient) { }

  getFiles() {

    return this.http.get<any>("https://street-jams-001.herokuapp.com/api/songs");
    // return this.http.get<any>("/api/songs");
    
  }

  getUserSongs(id) {
    return this.http.get(`https://street-jams-001.herokuapp.com/api/songs/user/${id}`);
    // return this.http.get(`/api/songs/user/${id}`);
  }

  removeSong(id) {
    console.log(id);
    this.http.delete("https://street-jams-001.herokuapp.com/api/songs/" + id).subscribe(res => console.log(res)
    // this.http.delete("/api/songs/" + id).subscribe(res => console.log(res)
    );
  }
}
