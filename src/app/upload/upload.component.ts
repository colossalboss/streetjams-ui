import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PublishService } from '../publish.service';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form;
  selectedFile: File;

  uploadStatus;
  uploadProgress

  categories: string[] = ["Pop", "R&B", "Jazz", "Rock", "Country", "Blues", "Other"]

  constructor(private formBuilder: FormBuilder, private publish: PublishService, private router: Router) {
    this.form = this.formBuilder.group({
      artist: ['', Validators.required],
      songTitle: ['', Validators.required],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onPublish(obj) {
    console.log(obj);

    const fd = new FormData();

    fd.append('title', this.selectedFile, this.selectedFile.name);
    fd.append('artist', obj.artist);
    fd.append('songTitle', obj.songTitle);
    fd.append('releaseDate', obj.releaseDate);
    fd.append('genre', obj.genre);

    this.publish.publish(fd).subscribe(event => {
      console.log(event)
      console.log("res");
      // console.log(res);

      if (event.type === HttpEventType.UploadProgress) {
        console.log("Upload progress: " + Math.round((event.loaded / event.total) * 100) + "%");

        this.uploadStatus = "Uploading...";
        this.uploadProgress = Math.round((event.loaded / event.total) * 100) + "%";
        
      } else if (event.type == HttpEventType.Response) {
        console.log(event);
        this.router.navigate(['/'])
      }
    })
  }

}
