import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

interface AuthPayload { data: { token: string; user: User }; message: string; }
export interface User { id: number; name: string; email: string; role: 'guest' | 'host'; locale: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8000/api/auth';
  readonly user = signal<User | null>(null);
  constructor(private http: HttpClient) {}
  login(payload: { email: string; password: string }) { return this.http.post<AuthPayload>(`${this.baseUrl}/login`, payload).pipe(tap(r => this.setSession(r.data))); }
  register(payload: { name: string; email: string; password: string; password_confirmation: string; role: string }) { return this.http.post<AuthPayload>(`${this.baseUrl}/register`, payload).pipe(tap(r => this.setSession(r.data))); }
  logout(): void { localStorage.removeItem('token'); this.user.set(null); }
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  private setSession(data: AuthPayload['data']): void { localStorage.setItem('token', data.token); this.user.set(data.user); }
}
