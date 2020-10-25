import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../document/document.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MatDialog, MatDialogConfig } from '@angular/material';

function readBase64(file) {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener('load', function () {
      resolve(reader.result);
    }, false);

    reader.addEventListener('error', function (event) {
      reject(event);
    }, false);

    reader.readAsDataURL(file);
  });
}
import { from } from 'rxjs';
import { PopupcreateComponent } from './popupcreate/popupcreate.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {
  popup: any;



  removeItem(i: number): void {
    this.arr.splice(i, 1);
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arr, event.previousIndex, event.currentIndex);
  }
  files: File[] = [];
  name: string[] = [];
  name1: any;
  i: any;
  arr = [];
  flag: boolean = false;
  size: any;
  options: UploaderOptions;
  // formData: FormData;
  files1: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  selected = 'option2';
  selected1 = 'option2';
  constructor(private router: Router, private service: DocumentService, private Dialog: MatDialog) {
    this.files1 = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

  }


  ngOnInit(): void {

  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files1.push(output.file);
          console.log(this.files1);
          for (this.i = 0; this.i < this.files1.length; this.i++) {
            this.name1 = this.files1[this.i].name;
            this.size = this.files1[this.i].size;
            this.flag = true;
            console.log(this.name1);

            this.size = (this.files1[this.i].size) / 1024 * 1000 + "kb"
            console.log("size", this.size);
          }
          // alert("your file size "+ (this.files1[0].size)/1024 *1000 + "kb")
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files1.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files1[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files1 = this.files1.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }
  onCreate() {

    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    // this.Dialog.open(PopupcreateComponent, dialogconfig);



    const dailogref = this.Dialog.open(PopupcreateComponent, dialogconfig)
    dailogref.afterClosed().subscribe((data: any) => {
      console.log("dialogoutput", data),
        this.popup = data.username;

      if (data.username !== "" || data.role !== "") {

        this.arr.push(data);
      }
      
      console.log(this.arr);
      // const mapped = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      // console.log(mapped);
      // this.popup1 = data.role;
      // console.log("name",this.username)

    });

  }
  startUpload(): void {

    this.service.postmethod(this.files1)
      .subscribe(
        Response => {
          console.log('sucess', Response);
        },
        error => console.log('error!', error)
      );

    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:50763/api/addDocH',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
    this.router.navigate(['signDoc']);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
