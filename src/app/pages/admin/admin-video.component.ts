import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-video',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <!-- Current Video Info -->
      <div *ngIf="videoInfo" class="info-card">
        <h3 class="card-title">Current Video</h3>
        <div *ngIf="videoInfo.exists" class="video-info">
          <div>
            <p><strong>File Name:</strong> {{ videoInfo.fileName }}</p>
            <p><strong>File Size:</strong> {{ formatFileSize(videoInfo.fileSize) }}</p>
            <p class="success-text">✓ Video is available</p>
          </div>
          <div>
            <button (click)="deleteVideo()" class="btn-delete">Delete Video</button>
          </div>
        </div>
        <div *ngIf="!videoInfo.exists" class="no-video">
          <p>No video uploaded yet. Upload a video below.</p>
        </div>
      </div>
          
      <!-- Upload Section -->
      <div class="content-card">
        <h3 class="card-title">Upload Delivery Process Video</h3>
        
        <div class="upload-area">
          <input type="file" 
                 #fileInput 
                 accept="video/*" 
                 (change)="onFileSelected($event)"
                 style="display: none;">
          
          <div *ngIf="!selectedFile && !uploading" class="upload-prompt">
            <div class="upload-icon">📹</div>
            <p>Click to select a video file (MP4, AVI, MOV, etc.)</p>
            <p class="upload-hint">Maximum file size: 100MB</p>
            <button (click)="fileInput.click()" class="btn-choose">Choose Video File</button>
          </div>
          
          <div *ngIf="selectedFile && !uploading" class="upload-selected">
            <p><strong>Selected:</strong> {{ selectedFile.name }}</p>
            <p>Size: {{ formatFileSize(selectedFile.size) }}</p>
            <div class="upload-actions">
              <button (click)="uploadVideo()" class="btn-upload">Upload Video</button>
              <button (click)="cancelSelection()" class="btn-cancel">Cancel</button>
            </div>
          </div>
          
          <div *ngIf="uploading" class="uploading">
            <div class="spinner"></div>
            <p>Uploading video... Please wait</p>
          </div>
        </div>
        
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div *ngIf="successMessage" class="success-message">
          {{ successMessage }}
        </div>
      </div>
      
      <!-- Preview Section -->
      <div *ngIf="videoInfo && videoInfo.exists" class="preview-card">
        <h3 class="card-title">Video Preview</h3>
        <div class="video-preview">
          <video controls>
            <source [src]="getVideoUrl()" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 0;
    }
    
    .info-card, .content-card, .preview-card {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      margin-bottom: 20px;
    }
    
    .card-title {
      margin: 0 0 15px 0;
      color: #050F24;
      font-size: 18px;
      font-weight: 600;
    }
    
    .video-info {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      align-items: center;
    }
    
    .success-text {
      color: #4caf50;
      margin: 5px 0;
    }
    
    .no-video {
      color: #6F757E;
    }
    
    .btn-delete {
      padding: 10px 20px;
      background: #F54F5F;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .upload-area {
      border: 2px dashed #E1E1E1;
      border-radius: 12px;
      padding: 40px;
      text-align: center;
      background: #FAFAFA;
    }
    
    .upload-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .upload-icon {
      font-size: 48px;
      color: #f15f22;
      margin-bottom: 15px;
    }
    
    .upload-hint {
      color: #6F757E;
      font-size: 14px;
      margin-bottom: 20px;
    }
    
    .btn-choose {
      padding: 12px 30px;
      background: #f15f22;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
    }
    
    .upload-selected {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .upload-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .btn-upload {
      padding: 12px 30px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .btn-cancel {
      padding: 12px 30px;
      background: #6F757E;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .uploading {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #F5F5F5;
      border-top: 4px solid #f15f22;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 15px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .error-message {
      margin-top: 20px;
      padding: 15px;
      background: #FFEBEE;
      color: #C62828;
      border-radius: 8px;
    }
    
    .success-message {
      margin-top: 20px;
      padding: 15px;
      background: #E8F5E9;
      color: #2E7D32;
      border-radius: 8px;
    }
    
    .video-preview {
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      max-width: 800px;
    }
    
    .video-preview video {
      width: 100%;
      max-height: 500px;
      display: block;
    }
  `]
})
export class AdminVideoComponent implements OnInit {
  selectedFile: File | null = null;
  uploading = false;
  errorMessage = '';
  successMessage = '';
  videoInfo: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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

}
