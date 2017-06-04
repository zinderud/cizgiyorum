import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import 'firebase/storage'; // only import firebase storage

@Injectable()
export class AddCizimService {

  private folder = 'cizimler';
  private uploadImage: any;
  private image: any;
  private fStorage: any;
  private storageRef: any;

  private body = document.getElementsByTagName('body');

  constructor(
    private router: Router,
    private _firebaseApp: FirebaseApp
  ) { 
    this.storageRef = _firebaseApp.storage().ref();
   }

  public show() {
    return this.body[0].style.overflow = '';
  }

  public addCizim(cizim, cizimList) {

    Promise.all([
      this.addImage(cizim, 'thumb' , 'thumbnail'),
      this.addImage(cizim, 'larg' , 'largImage')
    ]).then(value => {
      cizimList.push(cizim);
    }).then(value => {
      this.router.navigateByUrl('/cizimler');
      this.show();
    }).catch(error => console.log(error));

  }

  private addImage(cizim, dir, type) {

    if (type === 'thumbnail') {
      this.image = cizim.thumbnail.image;
    }

    if (type === 'largImage' ) {
      this.image = cizim.largImage.image;
    }

    const path = `/${this.folder}/${cizim.title}/${dir}/${this.image.name}`;
    const iRef = this.storageRef.child(path).put(this.image);
    return this.uploadImage = iRef.then(snapshot => {

      if (type === 'thumbnail') {
        cizim.thumbnail.url = snapshot.downloadURL;
        cizim.thumbnail.name = snapshot.metadata.name;
      }
      if (type === 'largImage') {
        cizim.largImage.url = snapshot.downloadURL;
        cizim.largImage.name = snapshot.metadata.name;
      }

    });
  }

}