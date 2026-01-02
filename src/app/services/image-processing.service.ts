import { Injectable } from '@angular/core';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ResizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  width?: number;
  height?: number;
  quality?: number; // 0.1 to 1.0
  maintainAspectRatio?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  /**
   * Resize an image file to the specified dimensions
   * @param file The image file to resize
   * @param options Resize options
   * @returns Promise that resolves to a Blob of the resized image
   */
  async resizeImage(file: File, options: ResizeOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          let { width, height } = this.calculateDimensions(
            img.width,
            img.height,
            options
          );

          canvas.width = width;
          canvas.height = height;

          // Draw the resized image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to blob
          const quality = options.quality || 0.9;
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create blob'));
              }
            },
            file.type || 'image/jpeg',
            quality
          );
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Calculate the new dimensions based on options
   */
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    options: ResizeOptions
  ): { width: number; height: number } {
    const maintainAspectRatio = options.maintainAspectRatio !== false;
    const aspectRatio = originalWidth / originalHeight;

    let width = originalWidth;
    let height = originalHeight;

    // If specific dimensions are provided
    if (options.width && options.height) {
      if (maintainAspectRatio) {
        // Fit within the specified dimensions while maintaining aspect ratio
        if (originalWidth / options.width > originalHeight / options.height) {
          width = options.width;
          height = options.width / aspectRatio;
        } else {
          height = options.height;
          width = options.height * aspectRatio;
        }
      } else {
        width = options.width;
        height = options.height;
      }
    } else if (options.width) {
      width = options.width;
      if (maintainAspectRatio) {
        height = width / aspectRatio;
      }
    } else if (options.height) {
      height = options.height;
      if (maintainAspectRatio) {
        width = height * aspectRatio;
      }
    }

    // Apply max constraints
    if (options.maxWidth && width > options.maxWidth) {
      width = options.maxWidth;
      if (maintainAspectRatio) {
        height = width / aspectRatio;
      }
    }

    if (options.maxHeight && height > options.maxHeight) {
      height = options.maxHeight;
      if (maintainAspectRatio) {
        width = height * aspectRatio;
      }
    }

    return {
      width: Math.round(width),
      height: Math.round(height)
    };
  }

  /**
   * Create a File object from a Blob
   */
  blobToFile(blob: Blob, fileName: string, mimeType?: string): File {
    const file = new File([blob], fileName, {
      type: mimeType || blob.type || 'image/jpeg',
      lastModified: Date.now()
    });
    return file;
  }

  /**
   * Get image dimensions from a file
   */
  async getImageDimensions(file: File): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const img = new Image();
        
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          });
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = e.target.result;
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Create a data URL from a file (for preview)
   */
  async fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }
}
