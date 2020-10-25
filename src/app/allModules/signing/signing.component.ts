
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digital } from './signing';
import { SignatureService } from '../signing/signature.service';
import { throwToolbarMixedModesError } from '@angular/material';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {
  digital1: digital[];
  flag:boolean = false;
  signaturePad: any;
  mode = '';
  mode1 = '';
  mode2 = '';
  mode3 = '';
  mode4 = '';
  mode5 = '';
  imageSrc = '';
  images=[];
  messageText = '';
  form: FormGroup;
  signatureImage: any;
  constructor(private fb: FormBuilder, private signservice: SignatureService) {
    this.form = this.fb.group({
      FileType: [''],
      FilePages: [''],
      FileSize: [''],
      FileType1: [''],
      FilePages1: [''],
      FileSize1: [''],
      CurrentApprover: ['', Validators.required]
    });
  }


  imageButtons: any[] = [{
    src: '../../assets/image/vsign/letter1.png', name: 'image - 2'
  },
  { src: '../../assets/image/vsign/letter copy.png', name: 'image-3' }, { src: '../../assets/image/vsign/letter1.png', name: 'image-4' }];
  images1:any = {src: '../../assets/image/vsign/letter1.png'}

  showImage(data) {
    this.signatureImage = data;
  }
  Onpen(){
    this.flag = true;
  }
  ngOnInit(): void {
    // this.images.push(this.imageButtons);
    // console.log(this.images);
    console.log("img",this.imageButtons);
    // this.imageButtons[0];
    this.signservice.getDB().subscribe(
      (data) => {
        console.log(data);
        this.digital1 = data;
        this.mode = this.digital1[0].FileType;
        this.mode1 = this.digital1[0].FilePages;
        this.mode2 = this.digital1[0].FileSize;
        this.mode3 = this.digital1[1].FileType;
        console.log(this.mode3);

        this.mode4 = this.digital1[1].FilePages;
        this.mode5 = this.digital1[1].FileSize;
        console.log(this.mode4);
        console.log(this.mode5);
        // this.mode3 = this.digital1[0].CurrentApprover;
        (err) => console.log(err)
      }
      // console.log(this.employee);
    );
  }
  print():void{
    window.print();
  }
  onClick(imagebutton) {
    this.imageSrc = imagebutton.src;
    this.messageText = imagebutton.name;
  }
}
