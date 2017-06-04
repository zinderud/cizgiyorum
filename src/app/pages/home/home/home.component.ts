import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '../../../services/app.service';
import { DescriptionService } from '../../../services/firebase/description/description.service';
import { SkillsService } from '../../../services/firebase/skills/skills.service';
import { CizimlerService } from '../../../services/firebase/cizimler/cizimler.service';
import { TitleService } from '../../../services/firebase/title/title.service';
import { EmailService } from '../../../services/email/email.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Cizim } from '../../../config/interface/cizim';
import { Skill } from '../../../config/interface/skill';
import { Subscription } from 'rxjs/Subscription';
import { LocalforageService } from '../../../services/localforage.service';

@Component({
  selector: 'kg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [AppService,
              DescriptionService,
              SkillsService,
              CizimlerService,
              TitleService,
              EmailService,
              NotificationService,
              LocalforageService]
})
export class HomeComponent implements OnInit, OnDestroy {

  public title: String = 'Cizgiyorum.com';
  public email: Subscription;
  public description: String;
  public skills: Skill[];
  public cizimler: Cizim[];

  public complexForm: FormGroup;

  constructor(
    private _appService: AppService,
    private _formBuilder: FormBuilder,
    private _descriptionService: DescriptionService,
    private _skillsService: SkillsService,
    private _cizimlerService: CizimlerService,
    private _titleService: TitleService,
    private _emailService: EmailService,
    private _notificationService: NotificationService,
    private _localforageService: LocalforageService
  ) {
    this.complexForm = _formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
      'message': [null, Validators.compose([Validators.required, Validators.minLength(20)])]
    });
  }

  ngOnInit(): void {
    // this.setTitle();
    this.setDescription();
    this.setSkills();
    this.setCizimler();
  }

  private setTitle() {
    return this._titleService.getTitle()
      .subscribe(data => this.title = data.title) as Subscription;
  }

  private setDescription() {
    return this._descriptionService.getDescription()
      .subscribe(data => {
        this.description = data.description;
        this._localforageService.localforageSave('description', data.description);
        this._localforageService.localforageGet('description');
      }) as Subscription;
  }

  private setSkills() {
    return this._skillsService.getListOfSkills()
      .subscribe(data => {
        this.skills = data;
        this._localforageService.localforageSave('skills', data);
        this._localforageService.localforageGet('skills');
      }) as Subscription;
  }

  private setCizimler() {
    return this._cizimlerService.getListCizimler()
      .subscribe(data => {
        this.cizimler = data.reverse().slice(0,4);
        this._localforageService.localforageSave('cizimler', data);
        this._localforageService.localforageGet('cizimler');
      }) as Subscription;
  }

  public openCizimler() {
    return this._appService.goToCizimlerPage() as Promise<boolean>;
  }

  public openCizim(key) {
    return this._appService.goToCizimPage(key) as Promise<boolean>;
  }

  public submitForm(value) {
    if (!value.name || !value.email || !value.message) { return; }
    if (this.complexForm.status === 'VALID') {
        return this.email = this._emailService.postEmail(value)
          .subscribe(data => {
            const string = value.message;
            const length = 60;
            const trimmedString = string.substring(0, length);
            this._notificationService.notifitem('email', `${value.name} Your Email Was Sent`, trimmedString, true);
            this.complexForm.reset()
          }) as Subscription;
    }
    return;
  }

  ngOnDestroy(): void {
    this.setTitle().unsubscribe();
    this.setDescription().unsubscribe();
    this.setSkills().unsubscribe();
    this.setCizimler().unsubscribe();
  }

}
