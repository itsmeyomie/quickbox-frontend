# Image Upload Component with Preset Dimensions

This guide explains how to use the reusable image upload component that automatically resizes images to preset dimensions.

## Overview

The `ImageUploadComponent` allows you to upload any image file, and it will automatically resize it to your specified dimensions. This is perfect for:
- Profile pictures
- Product images
- Blog post images
- Proof of delivery photos
- Any image that needs consistent dimensions

## Features

- ✅ Automatic image resizing to preset dimensions
- ✅ Maintains aspect ratio (optional)
- ✅ Image preview
- ✅ Angular Forms integration (ControlValueAccessor)
- ✅ Customizable dimensions (fixed or max constraints)
- ✅ Quality control
- ✅ Error handling
- ✅ Beautiful, modern UI

## Basic Usage

### 1. Import the Component

```typescript
import { ImageUploadComponent } from '../components/image-upload.component';

@Component({
  standalone: true,
  imports: [ImageUploadComponent, ...],
  // ...
})
```

### 2. Use in Template

#### Fixed Dimensions (e.g., 200×200px profile picture)

```html
<app-image-upload
  [dimensions]="{ width: 200, height: 200 }"
  placeholderText="Upload profile picture"
  (imageSelected)="onImageSelected($event)"
  (imageRemoved)="onImageRemoved()"
></app-image-upload>
```

#### Max Dimensions (maintains aspect ratio)

```html
<app-image-upload
  [maxWidth]="800"
  [maxHeight]="600"
  placeholderText="Upload blog post image"
  (imageSelected)="onImageSelected($event)"
></app-image-upload>
```

#### With Angular Forms

```html
<form #myForm="ngForm">
  <app-image-upload
    [(ngModel)]="myImage"
    name="myImage"
    [dimensions]="{ width: 400, height: 300 }"
    placeholderText="Upload image"
  ></app-image-upload>
</form>
```

## Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `dimensions` | `{ width: number, height: number }` | `undefined` | Fixed dimensions for the image |
| `maxWidth` | `number` | `undefined` | Maximum width (maintains aspect ratio) |
| `maxHeight` | `number` | `undefined` | Maximum height (maintains aspect ratio) |
| `quality` | `number` | `0.9` | Image quality (0.1 to 1.0) |
| `maintainAspectRatio` | `boolean` | `true` | Whether to maintain aspect ratio |
| `acceptedTypes` | `string` | `'image/*'` | Accepted file types |
| `placeholderText` | `string` | `'Click to upload image'` | Placeholder text |
| `altText` | `string` | `'Uploaded image'` | Alt text for the image |
| `displayWidth` | `number` | `undefined` | Display width for preview |
| `displayHeight` | `number` | `undefined` | Display height for preview |

## Component Outputs

| Output | Type | Description |
|--------|------|-------------|
| `imageSelected` | `EventEmitter<File>` | Emitted when an image is selected and processed |
| `imageRemoved` | `EventEmitter<void>` | Emitted when the image is removed |
| `processingError` | `EventEmitter<string>` | Emitted when an error occurs during processing |

## Examples

### Example 1: Profile Picture (200×200px)

```typescript
import { Component } from '@angular/core';
import { ImageUploadComponent } from '../components/image-upload.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <app-image-upload
      [dimensions]="{ width: 200, height: 200 }"
      placeholderText="Upload profile picture"
      (imageSelected)="onImageSelected($event)"
    ></app-image-upload>
  `
})
export class ProfileComponent {
  onImageSelected(file: File): void {
    console.log('Image selected:', file);
    // Upload to your server
    const formData = new FormData();
    formData.append('image', file);
    // this.http.post('/api/upload', formData).subscribe(...);
  }
}
```

### Example 2: Proof of Delivery (600×400px)

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from '../components/image-upload.component';

@Component({
  selector: 'app-pod',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <app-image-upload
      [dimensions]="{ width: 600, height: 400 }"
      placeholderText="Upload proof of delivery photo"
      (imageSelected)="onPODImageSelected($event)"
    ></app-image-upload>
  `
})
export class PODComponent {
  constructor(private http: HttpClient) {}

  onPODImageSelected(file: File): void {
    const formData = new FormData();
    formData.append('podImage', file);
    formData.append('taskId', '123');
    
    this.http.post('/api/rider/tasks/123/pod', formData).subscribe({
      next: (response) => console.log('POD uploaded:', response),
      error: (error) => console.error('Upload failed:', error)
    });
  }
}
```

### Example 3: With Form Integration

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from '../components/image-upload.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, ImageUploadComponent],
  template: `
    <form #productForm="ngForm" (ngSubmit)="onSubmit()">
      <input type="text" [(ngModel)]="productName" name="productName" required>
      
      <app-image-upload
        [(ngModel)]="productImage"
        name="productImage"
        [dimensions]="{ width: 400, height: 300 }"
        placeholderText="Upload product image"
      ></app-image-upload>
      
      <button type="submit" [disabled]="!productForm.valid">Submit</button>
    </form>
  `
})
export class ProductComponent {
  productName: string = '';
  productImage: File | null = null;

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.productName);
    if (this.productImage) {
      formData.append('image', this.productImage);
    }
    // Submit to API
  }
}
```

## How It Works

1. **User selects an image**: The component accepts any image file
2. **Image processing**: The `ImageProcessingService` resizes the image to your specified dimensions
3. **Preview**: A preview of the processed image is shown
4. **File output**: The processed `File` object is emitted via `imageSelected` event

## Image Processing Service

The `ImageProcessingService` provides the following methods:

- `resizeImage(file: File, options: ResizeOptions): Promise<Blob>` - Resize an image
- `blobToFile(blob: Blob, fileName: string, mimeType?: string): File` - Convert blob to file
- `getImageDimensions(file: File): Promise<ImageDimensions>` - Get image dimensions
- `fileToDataURL(file: File): Promise<string>` - Convert file to data URL for preview

## Tips

1. **Use fixed dimensions** when you need exact sizes (e.g., profile pictures, thumbnails)
2. **Use max dimensions** when you want to limit size but maintain aspect ratio (e.g., blog images)
3. **Adjust quality** for smaller file sizes (lower quality = smaller files)
4. **Set display dimensions** to control preview size without affecting the processed image

## Integration with Existing Components

You can easily integrate this into your existing components. For example, in the Rider component for POD images:

```typescript
// In rider.component.ts
import { ImageUploadComponent } from '../../components/image-upload.component';

// In template, add to POD modal:
<app-image-upload
  [(ngModel)]="podData.image"
  name="podImage"
  [dimensions]="{ width: 600, height: 400 }"
  placeholderText="Upload proof of delivery photo"
></app-image-upload>

// In submitPOD method:
if (this.podData.image) {
  formData.append('podImage', this.podData.image);
}
```

## See Also

- `src/app/components/image-upload-example.component.ts` - Complete examples
- `src/app/services/image-processing.service.ts` - Image processing logic
- `src/app/components/image-upload.component.ts` - Main component
