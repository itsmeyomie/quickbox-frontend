import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInitService } from './services/app-init.service';
import { TestQuoteFlowService } from './services/test-quote-flow.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(
    private appInit: AppInitService,
    private testService: TestQuoteFlowService
  ) {}

  async ngOnInit(): Promise<void> {
    // Initialize app (loads data from Firebase into in-memory stores)
    await this.appInit.init();
    
    // Expose test service to window for console testing
    (window as any).testQuoteFlow = this.testService;
    console.log('🧪 Test service available: window.testQuoteFlow');
    console.log('   Run: window.testQuoteFlow.runAllTests()');
    console.log('   Or: window.testQuoteFlow.getTestSummary()');
  }
}
