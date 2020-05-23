import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PublishService } from '../publish.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form;
  selectedFile: File;

  categories: string[] = ["Pop", "R&B", "Jazz", "Rock", "Country", "Blues", "Other"]

  constructor(private formBuilder: FormBuilder, private publish: PublishService) {
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

    this.publish.publish(fd).subscribe(res => {
      console.log(res);
    })
  }

}
