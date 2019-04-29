import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, OnDestroy {

  productId:number;
  private commentSub: Subscription;
  rating: number;
  count: number;

  constructor(private route: ActivatedRoute, private commentService: CommentService) {
    this.route.params
      .subscribe(params => {
        this.productId = params.id;
      });
  }

  ngOnInit() {
    this.commentService.getRating(this.productId);
    this.commentSub = this.commentService.getRatingUpdateListener()
      .subscribe(ratingData => {
        this.rating = ratingData.rating;
        this.count = ratingData.count;
      });
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }

}
