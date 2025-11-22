import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog.interface';
import { envs } from '../../../../config/envs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http:HttpClient
  ) { }




  public getBlogs():Observable<Blog[]>{
    return this.http.get<Blog[]>(`${envs.apiUrl}/blogs`);
  }

  public getBlogById(id_blog:number):Observable<Blog>{
    return this.http.get<Blog>(`${envs.apiUrl}/blogs/${id_blog}`)
  }

}
