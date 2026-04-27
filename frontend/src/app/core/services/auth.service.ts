import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

interface AuthPayload { data: { token: string; user: User }; message: string; }
export interface User { id: number; name: string; email: string; role: 'guest' | 'host' | 'admin'; locale: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8000/api/auth';
  readonly user = signal<User | null>(this.restoreUser());
  constructor(private http: HttpClient) {}
  login(payload: { email: string; password: string }) { return this.http.post<AuthPayload>(`${this.baseUrl}/login`, payload).pipe(tap(r => this.setSession(r.data))); }
  register(payload: { name: string; email: string; password: string; password_confirmation: string; role: string }) { return this.http.post<AuthPayload>(`${this.baseUrl}/register`, payload).pipe(tap(r => this.setSession(r.data))); }
  logout(): void {
    if (localStorage.getItem('token')) {
      this.http.post(`${this.baseUrl}/logout`, {}).pipe(catchError(() => of(null))).subscribe();
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
  }
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  private setSession(data: AuthPayload['data']): void { localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); this.user.set(data.user); }
  private restoreUser(): User | null {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  }
}
