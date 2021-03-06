import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';

import { MarkdownService } from '../../../services/markdown.service';
import { ImageService } from '../../../services/image/image.service';
import { AddCizimService } from '../../../services/firebase/addcizim/add-cizim.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { CizimlerService } from '../../../services/firebase/cizimler/cizimler.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Cizim } from 'app/config/interface/cizim';

@Component({
  selector: 'kg-addcizim',
  templateUrl: './addcizim.component.html',
  styleUrls: ['./addcizim.component.sass'],
  providers: [MarkdownService, ImageService, AddCizimService, NotificationService, CizimlerService]
})
export class AddcizimComponent implements OnInit {

  public fGroup: FormGroup;
  public title: String;
  public url: String;
  public markdown: String;

  public thumbnailBase64: String;
  public desktopBase64: String;

  public mdOutput: String;

  public thumbnailfile: File;
  public desktopImagefile: File;
  public cizimList: FirebaseListObservable<Cizim[]>;

  public thumbsize: Number;
  public desktopsize: Number;

  public uploading: boolean = false;

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.thumbSize();
      this.desktopSize();
    }

  constructor(
    private _markdownService: MarkdownService,
    private _formBuilder: FormBuilder,
    private _imageService: ImageService,
    private _addCizimService: AddCizimService,
    private _notificationService: NotificationService,
    private _cizimlerService: CizimlerService,
  ) {
    this.fGroup = _formBuilder.group({
      'title': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'url': [null, Validators.compose([Validators.required, Validators.pattern('https?://.+')])],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30)])],
      'markdown': [null, Validators.compose([Validators.required, Validators.minLength(30)])]
    });
   }

  ngOnInit() {
    this.loadCizimler();
  }

  private loadCizimler() {
    return this.cizimList = this._cizimlerService.getListCizimler();
  }

  public updateOutput(mdText: string) {
    return this.mdOutput = this._markdownService.convert(mdText);
  }

  public onThumbnail(event: EventTarget): File {
    const files = this._imageService.FileInputInfor(event);
    this._imageService.ShowImageFromInput(files, 'thumbnailImg');
    return this.thumbnailfile = files[0];
  }

  public onDesktopImage(event: EventTarget): File {
    const files = this._imageService.FileInputInfor(event);
    this._imageService.ShowImageFromInput(files, 'desktopImg');
    return this.desktopImagefile = files[0];
  }

  public thumbSize(): number {
    const thumbnailImg = document.getElementById('thumbnailImg').clientHeight;
    if (thumbnailImg === 0) { return; }
    return this.thumbsize = thumbnailImg;
  }

  public desktopSize(): number {
    const desktopImg = document.getElementById('desktopImg').clientHeight;
    if (desktopImg === 0) { return; }
    return this.desktopsize = desktopImg;
  }

  public addNewCizim(event: Cizim, isValid: Boolean) {

    this.inputErrorNotification(event);
    if (!isValid) { return }
    if (this.thumbnailfile === undefined) { return };
    if (this.desktopImagefile === undefined) { return };

    const date: Date = new Date();
    const thumb: HTMLElement = document.getElementById('thumbnailImg');
    const deskImage: HTMLElement = document.getElementById('desktopImg');

    this.thumbnailBase64 =  this._imageService.ImageToBase64(thumb, 0.01);
    this.desktopBase64 = this._imageService.ImageToBase64(deskImage, 0.01);

    const cizim = {
      title: event.title,
      url: event.url,
      description: event.description,
      markdown: event.markdown,
      thumbnail: {
        image: this.thumbnailfile,
        base64: this.thumbnailBase64
      },
      largImage: {
        image: this.desktopImagefile,
        base64: this.desktopBase64
      },
      timestamp: date.getTime()
    };

    Promise.all([
      this.thumbnailBase64,
      this.desktopBase64,
    ]).then(e => {
      this.uploading = true;
      this._addCizimService.addCizim(cizim, this.cizimList);
      console.log(this.cizimList);
    }).catch(error => {
      this._notificationService.notifitem('storage', error.name, error.message, true);
      this.uploading = false;
    });

  }

  private inputErrorNotification(event): void {

    if ( event.title === null || event.title === '' || event.title.length < 3 ) {
      return this._notificationService.notifitem('report_problem', 'Title Error', 'Title Must be More Than 3 Characters', true);
    }

    if ( event.url === null || event.url === '' ) {
      return this._notificationService.notifitem('report_problem', 'URL Error', 'URL Must be a Valid URL', true);
    }

    if ( event.description === null || event.description === '' || event.description.length < 30 ) {
      return this._notificationService.notifitem('report_problem', 'Description Error', 'Description Must be More Than 30 Characters', true);
    }

    if ( event.markdown === null || event.markdown === '' || event.markdown.length < 30 ) {
      return this._notificationService.notifitem('report_problem', 'Markdown Error', 'Markdown Must be More Than 30 Characters', true);
    }

    if ( this.thumbnailfile === null || this.thumbnailfile === undefined ) {
      return this._notificationService.notifitem('report_problem', 'Thumbnail Error', 'You Must have a Thumbnail Image', true);
    }

    if ( this.desktopImagefile === null || this.desktopImagefile === undefined ) {
      return this._notificationService.notifitem('report_problem', 'Desktop Image Error', 'You Must have a Desktop Preview Image', true);
    }

  }

}
