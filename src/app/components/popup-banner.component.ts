import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-popup-banner',
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="visible" id="qb-popup-overlay" class="qb-popup-overlay" (click)="closeOnOverlay($event)" role="dialog" aria-modal="true" aria-labelledby="qb-popup-title">
      <div id="qb-popup" class="qb-popup" (click)="$event.stopPropagation()">
        <button type="button" id="qb-close" class="qb-close" (click)="close()" aria-label="Close popup">
          &times;
        </button>

        <h1 id="qb-popup-title">Happy Chinese New Year 🧧</h1>
        <div class="qb-cn">新年快乐 · 生意兴隆</div>

        <p>
          Start the new year with reliable logistics.
          <strong>Quick Box</strong> helps Chinese sellers ship, fulfill,
          and deliver across Kenya with confidence.
        </p>

        <ul>
          <li>Fulfillment & Secure Warehousing</li>
          <li>Nationwide Last-Mile Delivery</li>
          <li>Cash-on-Delivery (COD) Collection</li>
          <li>Real-Time Tracking & Fast Remittance</li>
        </ul>

        <a routerLink="/contact" class="qb-cta" (click)="close()">
          Move Your Business Faster →
        </a>
      </div>
    </div>
  `,
  styles: [`
    .qb-popup-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: "Segoe UI", Arial, sans-serif;
      animation: qbOverlayFade 0.3s ease;
    }

    @keyframes qbOverlayFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .qb-popup {
      background: linear-gradient(135deg, #0b3c5d, #145da0);
      color: #ffffff;
      width: 90%;
      max-width: 430px;
      border-radius: 18px;
      padding: 26px 24px 28px;
      text-align: center;
      position: relative;
      box-shadow: 0 25px 50px rgba(0,0,0,0.35);
      animation: qbFadeIn 0.6s ease;
    }

    @keyframes qbFadeIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .qb-popup h1 {
      font-size: 24px;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .qb-cn {
      font-size: 17px;
      margin-bottom: 14px;
      opacity: 0.95;
    }

    .qb-popup p {
      font-size: 15px;
      line-height: 1.55;
      margin-bottom: 18px;
      color: #f1f5f9;
    }

    .qb-popup ul {
      list-style: none;
      padding: 0;
      margin: 0 0 20px;
      text-align: left;
    }

    .qb-popup ul li {
      font-size: 14px;
      margin-bottom: 9px;
      padding-left: 18px;
      position: relative;
    }

    .qb-popup ul li::before {
      content: "✔";
      position: absolute;
      left: 0;
      color: #f59e0b;
      font-weight: bold;
    }

    .qb-cta {
      display: inline-block;
      background: #f59e0b;
      color: #0b3c5d;
      padding: 13px 26px;
      border-radius: 40px;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .qb-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      color: #0b3c5d;
    }

    .qb-close {
      position: absolute;
      top: 12px;
      right: 16px;
      font-size: 22px;
      cursor: pointer;
      opacity: 0.85;
      background: none;
      border: none;
      color: white;
      padding: 4px 8px;
      line-height: 1;
    }

    .qb-close:hover {
      opacity: 1;
    }
  `]
})
export class PopupBannerComponent implements OnInit {
  visible = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1500);
  }

  close(): void {
    this.visible = false;
  }

  closeOnOverlay(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('qb-popup-overlay')) {
      this.close();
    }
  }
}
