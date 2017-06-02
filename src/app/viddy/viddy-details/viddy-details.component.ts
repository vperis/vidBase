import { Component, Input } from '@angular/core';
import { Viddy } from '../viddy';
import { ViddyService } from '../viddy.service';

@Component({
  selector: 'viddy-details',
  templateUrl: './viddy-details.component.html',
  styleUrls: ['./viddy-details.component.css']
})

export class ViddyDetailsComponent {
  @Input()
  viddy: Viddy;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private viddyService: ViddyService) {}

  createViddy(viddy: Viddy) {
    this.viddyService.createViddy(viddy).then((newViddy: Viddy) => {
      this.createHandler(newViddy);
    });
  }

  updateViddy(viddy: Viddy): void {
    this.viddyService.updateViddy(viddy).then((updatedViddy: Viddy) => {
      this.updateHandler(updatedViddy);
    });
  }

  deleteViddy(viddyId: String): void {
    this.viddyService.deleteViddy(viddyId).then((deletedViddyId: String) => {
      this.deleteHandler(deletedViddyId);
    });
  }
}