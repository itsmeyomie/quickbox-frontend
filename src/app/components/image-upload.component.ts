import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageProcessingService, ResizeOptions } from '../services/image-processing.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ],
  template: `
    <div class="image-upload-container">
      <div class="image-upload-wrapper" [class.has-image]="previewUrl">
        <input
          type="file"
          #fileInput
          [accept]="acceptedTypes"
          (change)="onFileSelected($event)"
          style="display: none;"
          [id]="inputId"
        />
        
        <div *ngIf="!previewUrl" class="upload-placeholder" (click)="fileInput.click()">
          <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <p class="upload-text">{{ placeholderText }}</p>
          <p class="upload-hint" *ngIf="dimensions">
            Images will be resized to {{ dimensions.width }}×{{ dimensions.height }}px
          </p>
        </div>

        <div *ngIf="previewUrl" class="image-preview">
          <img [src]="previewUrl" [alt]="altText" [style.width.px]="displayWidth" [style.height.px]="displayHeight" />
          <div class="image-overlay">
            <button type="button" class="btn-change" (click)="fileInput.click()" title="Change Image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            <button type="button" class="btn-remove" (click)="removeImage()" title="Remove Image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="isProcessing" class="processing-indicator">
        <div class="spinner"></div>
        <span>Processing image...</span>
      </div>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .image-upload-container {
      width: 100%;
    }

    .image-upload-wrapper {
      position: relative;
      border: 2px dashed #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: #f9f9f9;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .image-upload-wrapper:hover {
      border-color: #667eea;
      background: #f5f5f5;
    }

    .image-upload-wrapper.has-image {
      border: none;
      cursor: default;
    }

    .upload-placeholder {
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
    }

    .upload-icon {
      color: #667eea;
      margin-bottom: 12px;
    }

    .upload-text {
      margin: 0;
      color: #333;
      font-weight: 500;
      font-size: 16px;
    }

    .upload-hint {
      margin: 8px 0 0 0;
      color: #666;
      font-size: 12px;
    }

    .image-preview {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f0f0;
    }

    .image-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .image-preview:hover .image-overlay {
      opacity: 1;
    }

    .btn-change,
    .btn-remove {
      background: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
      color: #333;
    }

    .btn-change:hover {
      transform: scale(1.1);
      color: #667eea;
    }

    .btn-remove:hover {
      transform: scale(1.1);
      color: #f44336;
    }

    .processing-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      color: #667eea;
      font-size: 14px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      margin-top: 10px;
      padding: 10px;
      background: #ffebee;
      color: #c62828;
      border-radius: 4px;
      font-size: 14px;
    }
  `]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Input() dimensions?: { width: number; height: number };
  @Input() maxWidth?: number;
  @Input() maxHeight?: number;
  @Input() quality: number = 0.9;
  @Input() maintainAspectRatio: boolean = true;
  @Input() acceptedTypes: string = 'image/*';
  @Input() placeholderText: string = 'Click to upload image';
  @Input() altText: string = 'Uploaded image';
  @Input() displayWidth?: number;
  @Input() displayHeight?: number;
  @Input() inputId: string = 'image-upload-' + Math.random().toString(36).substr(2, 9);

  @Output() imageSelected = new EventEmitter<File>();
  @Output() imageRemoved = new EventEmitter<void>();
  @Output() processingError = new EventEmitter<string>();

  previewUrl: string | null = null;
  processedFile: File | null = null;
  isProcessing: boolean = false;
  errorMessage: string = '';

  private onChange = (file: File | null) => {};
  private onTouched = () => {};

  constructor(private imageService: ImageProcessingService) {}

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.showError('Please select a valid image file');
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.onTouched();

    try {
      let processedBlob: Blob;
      let finalFile: File;

      // If dimensions are specified, resize the image
      if (this.dimensions || this.maxWidth || this.maxHeight) {
        const resizeOptions: ResizeOptions = {
          width: this.dimensions?.width,
          height: this.dimensions?.height,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          quality: this.quality,
          maintainAspectRatio: this.maintainAspectRatio
        };

        processedBlob = await this.imageService.resizeImage(file, resizeOptions);
        finalFile = this.imageService.blobToFile(
          processedBlob,
          file.name,
          file.type
        );
      } else {
        // No resizing needed, use original file
        finalFile = file;
        processedBlob = file;
      }

      // Create preview
      this.previewUrl = await this.imageService.fileToDataURL(finalFile);
      this.processedFile = finalFile;

      // Emit events
      this.imageSelected.emit(finalFile);
      this.onChange(finalFile);

      // Reset file input to allow selecting the same file again
      input.value = '';
    } catch (error: any) {
      this.showError(error.message || 'Failed to process image');
      this.processingError.emit(error.message || 'Failed to process image');
    } finally {
      this.isProcessing = false;
    }
  }

  removeImage(): void {
    this.previewUrl = null;
    this.processedFile = null;
    this.errorMessage = '';
    this.onChange(null);
    this.imageRemoved.emit();
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  // ControlValueAccessor implementation
  writeValue(value: File | null): void {
    if (value) {
      this.imageService.fileToDataURL(value).then(url => {
        this.previewUrl = url;
        this.processedFile = value;
      });
    } else {
      this.previewUrl = null;
      this.processedFile = null;
    }
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }
}
