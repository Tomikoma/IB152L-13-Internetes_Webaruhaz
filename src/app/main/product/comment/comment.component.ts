import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../comment.service';
import { MyComment } from '../mycomment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  comments: MyComment[];
  productId: number;
  private commentSub: Subscription;

  constructor(private commentService: CommentService, private route: ActivatedRoute) {
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
  }


  addComment() {
    return 0;
  }

  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }
}
