import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload.component';

/**
 * Example component demonstrating how to use the ImageUploadComponent
 * with preset dimensions. You can use this as a reference or integrate
 * the ImageUploadComponent directly into your existing components.
 */
@Component({
  selector: 'app-image-upload-example',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploadComponent],
  template: `
    <div style="max-width: 800px; margin: 40px auto; padding: 20px;">
      <h2 style="margin-bottom: 30px;">Image Upload with Preset Dimensions</h2>

      <!-- Example 1: Fixed dimensions (e.g., profile picture) -->
      <div style="margin-bottom: 40px;">
        <h3>Example 1: Profile Picture (200×200px)</h3>
        <p style="color: #666; margin-bottom: 15px;">
          Upload any image and it will be automatically resized to 200×200 pixels
        </p>
        <app-image-upload
          [dimensions]="{ width: 200, height: 200 }"
          placeholderText="Upload profile picture"
          (imageSelected)="onProfileImageSelected($event)"
          (imageRemoved)="onProfileImageRemoved()"
        ></app-image-upload>
        <div *ngIf="profileImage" style="margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 4px;">
          <strong>Selected:</strong> {{ profileImage.name }} ({{ (profileImage.size / 1024).toFixed(2) }} KB)
        </div>
      </div>

      <!-- Example 2: Max dimensions (e.g., blog post image) -->
      <div style="margin-bottom: 40px;">
        <h3>Example 2: Blog Post Image (Max 800×600px)</h3>
        <p style="color: #666; margin-bottom: 15px;">
          Upload any image and it will be resized to fit within 800×600 pixels while maintaining aspect ratio
        </p>
        <app-image-upload
          [maxWidth]="800"
          [maxHeight]="600"
          placeholderText="Upload blog post image"
          (imageSelected)="onBlogImageSelected($event)"
          (imageRemoved)="onBlogImageRemoved()"
        ></app-image-upload>
        <div *ngIf="blogImage" style="margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 4px;">
          <strong>Selected:</strong> {{ blogImage.name }} ({{ (blogImage.size / 1024).toFixed(2) }} KB)
        </div>
      </div>

      <!-- Example 3: Custom dimensions with form integration -->
      <div style="margin-bottom: 40px;">
        <h3>Example 3: Product Image (400×300px) with Form</h3>
        <p style="color: #666; margin-bottom: 15px;">
          This example shows how to use the component with Angular forms
        </p>
        <form #productForm="ngForm" (ngSubmit)="onSubmitProduct()">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Product Name:</label>
            <input type="text" [(ngModel)]="productName" name="productName" required
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          <div style="margin-bottom: 15px;">
            <app-image-upload
              [(ngModel)]="productImage"
              name="productImage"
              [dimensions]="{ width: 400, height: 300 }"
              placeholderText="Upload product image"
              [displayWidth]="400"
              [displayHeight]="300"
            ></app-image-upload>
          </div>
          <button type="submit" [disabled]="!productForm.valid"
                  style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Submit Product
          </button>
        </form>
      </div>

      <!-- Example 4: POD (Proof of Delivery) Image -->
      <div style="margin-bottom: 40px;">
        <h3>Example 4: Proof of Delivery Image (600×400px)</h3>
        <p style="color: #666; margin-bottom: 15px;">
          Example for delivery confirmation photos
        </p>
        <app-image-upload
          [dimensions]="{ width: 600, height: 400 }"
          placeholderText="Upload proof of delivery photo"
          (imageSelected)="onPODImageSelected($event)"
        ></app-image-upload>
      </div>
    </div>
  `
})
export class ImageUploadExampleComponent {
  profileImage: File | null = null;
  blogImage: File | null = null;
  productImage: File | null = null;
  productName: string = '';

  onProfileImageSelected(file: File): void {
    this.profileImage = file;
    console.log('Profile image selected:', file);
    // Here you can upload the file to your server
    // this.uploadImage(file, 'profile');
  }

  onProfileImageRemoved(): void {
    this.profileImage = null;
    console.log('Profile image removed');
  }

  onBlogImageSelected(file: File): void {
    this.blogImage = file;
    console.log('Blog image selected:', file);
    // this.uploadImage(file, 'blog');
  }

  onBlogImageRemoved(): void {
    this.blogImage = null;
    console.log('Blog image removed');
  }

  onPODImageSelected(file: File): void {
    console.log('POD image selected:', file);
    // Create FormData and send to server
    // const formData = new FormData();
    // formData.append('podImage', file);
    // this.http.post('/api/pod', formData).subscribe(...);
  }

  onSubmitProduct(): void {
    if (this.productImage) {
      console.log('Submitting product:', {
        name: this.productName,
        image: this.productImage
      });
      // Submit to your API
    }
  }

  // Example upload method (you can adapt this to your API)
  // private uploadImage(file: File, type: string): void {
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   formData.append('type', type);
  //   
  //   this.http.post('/api/upload', formData).subscribe({
  //     next: (response) => console.log('Upload successful:', response),
  //     error: (error) => console.error('Upload failed:', error)
  //   });
  // }
}
