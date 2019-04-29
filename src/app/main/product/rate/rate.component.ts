import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, OnDestroy {

  productId: number;
  isUserAuthenticated = false;
  private commentSub: Subscription;
  private authStatusSub: Subscription;
  rating: number;
  count: number;
  value = 5;
  ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private route: ActivatedRoute, private commentService: CommentService, private authService:AuthService) {
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
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  rate(selectedRating: number){
    this.commentService.rateProduct(this.productId, selectedRating);
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
