import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../comment.service';
import { MyComment } from '../mycomment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  comments: MyComment[];
  productId: number;
  isUserAuthenticated = false;
  private commentSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private commentService: CommentService, private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe( params => {
      this.productId = params.id;
    });
  }

  ngOnInit() {
    this.commentService.getComments(this.productId);
    this.commentSub = this.commentService.getCommentsUpdateListener()
      .subscribe(commentData => {
        this.comments = commentData.comments;
        console.log(this.comments);
      });
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    })
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }
}
