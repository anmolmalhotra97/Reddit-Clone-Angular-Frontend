import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from 'src/app/components/post/create-post/create-post.payload';
import { environment } from 'src/environments/environment';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(this.baseUrl + 'api/posts')
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'api/posts', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(this.baseUrl + 'api/posts/' + id);
  }

  getAllPostsByUser(name: string) {
    return this.httpClient.get<PostModel[]>(this.baseUrl + 'api/posts/by-user/' + name);
  }

}
