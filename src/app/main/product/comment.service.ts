import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MyComment } from './mycomment.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CommentService {

  comments: MyComment[];
  rating: number;
  count: number;
  private commentsUpdated = new Subject<{comments: MyComment[]}>();
  private ratingUpdated = new Subject<{rating: number, count: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getComments(id: number) {
    this.http.get<{comments: any[]}>('http://localhost:3000/api/opinion/comments/' + id)
      .subscribe(commentData => {
        console.log(commentData)
        this.comments = commentData.comments;
        this.comments.forEach(element => {
          element.commentDate = new Date(element.commentDate);
        });
        this.commentsUpdated.next({comments: this.comments});
      });
  }

  getRating(id: number) {
    this.http.get<{rating:number,count: number}>('http://localhost:3000/api/opinion/rating/' + id)
      .subscribe(ratingData => {
        this.rating = ratingData.rating;
        this.count = ratingData.count;
        this.ratingUpdated.next({rating: this.rating, count: this.count});
      });
  }

  rateProduct(productId: number, rating: number) {
    this.http.post('http://localhost:3000/api/opinion/rating/' + productId, {rating}).subscribe(response => {
      console.log(response);
      this.getRating(productId);
    });
  }

  addComment(productId: number, content: string) {
    this.http.post('http://localhost:3000/api/opinion/comments/' + productId, {content}).subscribe(response => {
      console.log(response);
      this.getComments(productId);
    });
  }


  getCommentsUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  getRatingUpdateListener() {
    return this.ratingUpdated.asObservable();
  }
}
