import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  productId: number;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private router: Router) {
    this.route.params.subscribe( params => {
      this.productId = params.id;
      console.log(params);
    });
  }

  addComment(form: NgForm) {
    this.commentService.addComment(this.productId, form.value.comment);
  }

  ngOnInit() {
  }

}
