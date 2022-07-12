import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentsPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentsPayload[]> {
    return this.httpClient.get<CommentsPayload[]>(this.baseUrl + 'api/comments/by-postId/' + postId);
  }

  postComment(commentPayload: CommentsPayload): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentsPayload[]>(this.baseUrl + 'api/comments/by-user/' + name);
  }
}
