import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { CizimlerService } from '../../../services/firebase/cizimler/cizimler.service';
import { Cizim } from '../../../config/interface/cizim';

@Component({
  selector: 'kg-cizimler',
  templateUrl: './cizimler.component.html',
  styleUrls: ['./cizimler.component.sass'],
  providers: [AppService, CizimlerService]
})
export class CizimlerComponent implements OnInit, OnDestroy {

  public title: String;
  public cizimler: Cizim[];
  public searchTitle: Cizim[];
  public searchMarkdown: Cizim[];
  public searchInfo: Cizim[];
  public pageTitle = 'Cizimler';

  constructor(
    private _appService: AppService,
    private _cizimlerService: CizimlerService
  ) { }

  ngOnInit() {
    this.setCizimler();
  }

  private setCizimler() {
    return this._cizimlerService.getListCizimler().subscribe(data => this.cizimler = data);
  }

  openCizim(key) {
    return this._appService.goToCizimPage(key);
  }

  public searchValue(event) {
    if (event === '' || event === null || event === undefined) {
        this.resetSearch();
       } else {
        const value = event.toLowerCase();
        this.searchTitle = this.cizimler.filter(sh => sh.title.toLowerCase().indexOf(value) > -1).filter((el, index) => index < 4);
        this.searchMarkdown = this.cizimler.filter(sh => sh.markdown.toLowerCase().indexOf(value) > -1).filter((el, index) => index < 4);
        this.searchInfo = this.cizimler.filter(sh => sh.description.toLowerCase().indexOf(value) > -1).filter((el, index) => index < 4);
        return;
       }
  }

  private resetSearch(): void {
    this.searchTitle = null;
    this.searchMarkdown = null;
    this.searchInfo = null;
  }

  clearSearch() {
    return this.resetSearch();
  }

  ngOnDestroy() {
    this.setCizimler().unsubscribe();
  }

}
