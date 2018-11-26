import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HELLO_WORLD_URL = new InjectionToken<string>(
  'localhost:8000/hello-world'
);

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  constructor(
    @Inject(HELLO_WORLD_URL) private readonly api_url: string,
    private readonly http: HttpClient
  ) {}

  getHelloWorld(): Observable<{ message: string }> {
    return this.http.get<any>('http://localhost:8000/helloworld/');
  }
}
