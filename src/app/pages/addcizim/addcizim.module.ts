import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddcizimComponent } from './addcizim/addcizim.component';
import { HeadModule } from '../../components/head/head.module';
import { FooterModule } from '../../components/footer/footer.module';
import { BtnModule } from '../../components/btn/btn.module';
import { CardModule } from '../../components/card/card.module';
import 'firebase/storage'; // only import firebase storage
import { AngularFireModule } from 'angularfire2';
import { ProgressbarModule } from '../../components/progressbar/progressbar.module';
import { DialogModule } from '../../components/dialog/dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeadModule,
    FooterModule,
    BtnModule,
    CardModule,
    ProgressbarModule,
    AngularFireModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule.forChild([
      { path: '', component: AddcizimComponent }
    ])
  ],
  declarations: [AddcizimComponent]
})
export class AddcizimModule { }
