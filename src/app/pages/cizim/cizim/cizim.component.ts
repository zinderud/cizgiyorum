import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CizimlerService } from '../../../services/firebase/cizimler/cizimler.service';
import { MarkdownService } from '../../../services/markdown.service';
import { Cizim } from '../../../config/interface/cizim';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'kg-cizim',
  templateUrl: './cizim.component.html',
  styleUrls: ['./cizim.component.sass'],
  providers: [CizimlerService, MarkdownService]
})
export class CizimComponent implements OnInit, OnDestroy {

  private id: String;
  public cizim: any;
  public mdOutput: String;
  public tpggleImge = 'hideImage';
  public tpggleThum = '';

  constructor(
    private _cizimlerService: CizimlerService,
    private router: Router,
    private route: ActivatedRoute,
    private md: MarkdownService
  ) { }

  ngOnInit(): void {
    this.updateMe();
    this.router.events.subscribe(() => this.updateMe());
  }

  updateMe(): Subscription {
    this.id = this.route.snapshot.params['id'];
    return this._cizimlerService.getCizimObject(this.id).subscribe(data => {
      this.cizim = data;
      this.mdOutput = this.md.convert(data.markdown);
    });
  }

  ImageLoadedd(): void {
    this.tpggleImge = !this.tpggleImge ? 'hideImage' : 'showImage';
    this.tpggleThum = !this.tpggleThum ? 'hideImage' : 'hideImage';
  }

  LoadDefault(): String {
    return this.cizim.imagePath = this.cizim.desktopBase64;
  }

  ngOnDestroy(): void {
    this.updateMe().unsubscribe();
  }

}
