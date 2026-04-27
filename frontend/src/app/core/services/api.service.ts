import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ApiResponse<T> { message: string; data: T; }
export interface Paginated<T> { data: T[]; links?: unknown; meta?: unknown; }
export interface PropertyServiceCategory { category: string; category_es?: string; category_en?: string; items: string[]; }
export interface Property { id: number; slug?: string; business_name?: string; logo_url?: string; facade_image_url?: string; services?: PropertyServiceCategory[]; title: string; description: string; title_es: string; title_en: string; description_es: string; description_en: string; price_per_night: string; cleaning_fee: string; max_guests: number; city: string; country: string; images: string[]; rating_avg?: number; status: string; }
export interface Booking { id: number; property: Property; start_date: string; end_date: string; status: string; expires_at?: string; total_amount: string; payment?: Payment; }
export interface Payment { id: number; status: 'pending' | 'paid' | 'failed'; external_payment_id?: string; amount: string; currency: string; }
export interface Activity { id: number; property_id: number; title: string; description?: string; title_es: string; title_en: string; description_es?: string; description_en?: string; category: string; category_es: string; category_en: string; price: string | number; duration_minutes?: number; image_url?: string; status: string; property?: Property; }
export interface DashboardUser { id: number; name: string; email: string; role: string; }
export interface AdminDashboard { totals: { users: number; hosts: number; guests: number; properties: number; activities: number; bookings: number; payments_paid: number; reviews: number; revenue: number; }; recent: { users: DashboardUser[]; properties: Property[]; bookings: Booking[]; activities: Activity[] }; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  getProperties(filters: Record<string, string | number | undefined>): Observable<Paginated<Property>> { return this.http.get<Paginated<Property>>(`${this.baseUrl}/properties`, { params: this.params(filters) }); }
  getProperty(id: string | number): Observable<ApiResponse<Property>> { return this.http.get<ApiResponse<Property>>(`${this.baseUrl}/properties/${id}`); }
  getPublicPage(slug: string): Observable<ApiResponse<Property>> { return this.http.get<ApiResponse<Property>>(`${this.baseUrl}/public-pages/${slug}`); }
  getPublicActivities(propertyId: number): Observable<Paginated<Activity>> { return this.http.get<Paginated<Activity>>(`${this.baseUrl}/properties/${propertyId}/activities`); }
  getActivities(): Observable<Paginated<Activity>> { return this.http.get<Paginated<Activity>>(`${this.baseUrl}/activities`); }
  createActivity(payload: Partial<Activity>, image?: File | null): Observable<ApiResponse<Activity>> {
    if (!image) return this.http.post<ApiResponse<Activity>>(`${this.baseUrl}/activities`, payload);
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    formData.append('image', image);
    return this.http.post<ApiResponse<Activity>>(`${this.baseUrl}/activities`, formData);
  }
  deleteActivity(id: number): Observable<ApiResponse<null>> { return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/activities/${id}`); }
  getAdminDashboard(): Observable<ApiResponse<AdminDashboard>> { return this.http.get<ApiResponse<AdminDashboard>>(`${this.baseUrl}/admin/dashboard`); }
  createBooking(payload: { property_id: number; start_date: string; end_date: string }): Observable<ApiResponse<Booking>> { return this.http.post<ApiResponse<Booking>>(`${this.baseUrl}/bookings`, payload); }
  getBookings(): Observable<Paginated<Booking>> { return this.http.get<Paginated<Booking>>(`${this.baseUrl}/bookings`); }
  createPaymentIntent(paymentId: number): Observable<ApiResponse<Payment>> { return this.http.post<ApiResponse<Payment>>(`${this.baseUrl}/payments/${paymentId}/intent`, {}); }
  private params(filters: Record<string, string | number | undefined>): HttpParams { let params = new HttpParams(); Object.entries(filters).forEach(([k, v]) => { if (v !== undefined && v !== '') params = params.set(k, String(v)); }); return params; }
}
