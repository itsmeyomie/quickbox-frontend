import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-video',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Delivery Process Video</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="display: flex; gap: 15px; margin-bottom: 20px;">
            <a [routerLink]="['/admin']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Dashboard</a>
            <a [routerLink]="['/admin/users']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Users</a>
            <a [routerLink]="['/admin/quotes']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Quotes</a>
            <a [routerLink]="['/admin/video']" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Video</a>
            <a [routerLink]="['/admin/reports']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Reports</a>
          </div>
          
          <!-- Current Video Info -->
          <div *ngIf="videoInfo" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; color: #333;">Current Video</h3>
            <div *ngIf="videoInfo.exists" style="display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
              <div>
                <p style="margin: 5px 0; color: #666;"><strong>File Name:</strong> {{ videoInfo.fileName }}</p>
                <p style="margin: 5px 0; color: #666;"><strong>File Size:</strong> {{ formatFileSize(videoInfo.fileSize) }}</p>
                <p style="margin: 5px 0; color: #4caf50;">✓ Video is available</p>
              </div>
              <div>
                <button (click)="deleteVideo()" 
                        style="padding: 10px 20px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  Delete Video
                </button>
              </div>
            </div>
            <div *ngIf="!videoInfo.exists" style="color: #999;">
              <p>No video uploaded yet. Upload a video below.</p>
            </div>
          </div>
          
          <!-- Upload Section -->
          <div>
            <h3 style="margin: 0 0 20px 0; color: #333;">Upload Delivery Process Video</h3>
            
            <div style="border: 2px dashed #ddd; border-radius: 8px; padding: 40px; text-align: center; background: #fafafa;">
              <input type="file" 
                     #fileInput 
                     accept="video/*" 
                     (change)="onFileSelected($event)"
                     style="display: none;">
              
              <div *ngIf="!selectedFile && !uploading">
                <div style="font-size: 48px; color: #667eea; margin-bottom: 15px;">📹</div>
                <p style="color: #666; margin-bottom: 20px;">Click to select a video file (MP4, AVI, MOV, etc.)</p>
                <p style="color: #999; font-size: 14px; margin-bottom: 20px;">Maximum file size: 100MB</p>
                <button (click)="fileInput.click()" 
                        style="padding: 12px 30px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                  Choose Video File
                </button>
              </div>
              
              <div *ngIf="selectedFile && !uploading">
                <p style="color: #333; margin-bottom: 10px;"><strong>Selected:</strong> {{ selectedFile.name }}</p>
                <p style="color: #666; margin-bottom: 20px;">Size: {{ formatFileSize(selectedFile.size) }}</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                  <button (click)="uploadVideo()" 
                          style="padding: 12px 30px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                    Upload Video
                  </button>
                  <button (click)="cancelSelection()" 
                          style="padding: 12px 30px; background: #999; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                    Cancel
                  </button>
                </div>
              </div>
              
              <div *ngIf="uploading" style="padding: 20px;">
                <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
                <p style="color: #667eea;">Uploading video... Please wait</p>
              </div>
            </div>
            
            <div *ngIf="errorMessage" style="margin-top: 20px; padding: 15px; background: #ffebee; color: #c62828; border-radius: 5px;">
              {{ errorMessage }}
            </div>
            
            <div *ngIf="successMessage" style="margin-top: 20px; padding: 15px; background: #e8f5e9; color: #2e7d32; border-radius: 5px;">
              {{ successMessage }}
            </div>
          </div>
          
          <!-- Preview Section -->
          <div *ngIf="videoInfo && videoInfo.exists" style="margin-top: 30px;">
            <h3 style="margin: 0 0 20px 0; color: #333;">Video Preview</h3>
            <div style="background: #000; border-radius: 8px; overflow: hidden; max-width: 800px;">
              <video controls style="width: 100%; max-height: 500px;">
                <source [src]="getVideoUrl()" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `
})
export class AdminVideoComponent implements OnInit {
  selectedFile: File | null = null;
  uploading = false;
  errorMessage = '';
  successMessage = '';
  videoInfo: any = null;
  currentUser: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadVideoInfo();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        this.errorMessage = 'Please select a valid video file';
        return;
      }
      
      // Validate file size (100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds 100MB limit';
        return;
      }
      
      this.selectedFile = file;
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  uploadVideo(): void {
    if (!this.selectedFile) return;
    
    this.uploading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.post<any>(`${this.apiUrl}/videos/upload`, formData, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Video uploaded successfully!';
          this.selectedFile = null;
          this.loadVideoInfo();
        } else {
          this.errorMessage = response.message || 'Upload failed';
        }
        this.uploading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to upload video. Please try again.';
        this.uploading = false;
      }
    });
  }

  cancelSelection(): void {
    this.selectedFile = null;
    this.errorMessage = '';
    this.successMessage = '';
  }

  loadVideoInfo(): void {
    this.http.get<any>(`${this.apiUrl}/videos/info`).subscribe({
      next: (response) => {
        this.videoInfo = response;
      },
      error: (error) => {
        console.error('Error loading video info:', error);
        this.videoInfo = { exists: false };
      }
    });
  }

  deleteVideo(): void {
    if (!confirm('Are you sure you want to delete this video?')) return;
    
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.delete<any>(`${this.apiUrl}/videos/delete`, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Video deleted successfully';
          this.loadVideoInfo();
        } else {
          this.errorMessage = response.message || 'Failed to delete video';
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete video';
      }
    });
  }

  getVideoUrl(): string {
    return `${this.apiUrl}/videos/delivery-process`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  logout(): void {
    this.authService.logout();
  }
}
