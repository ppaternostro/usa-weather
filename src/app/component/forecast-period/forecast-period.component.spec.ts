import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';
import { mockPeriod } from '../../mock/model/weather/forecast/mock-period';
import { ForecastPeriodComponent } from './forecast-period.component';

describe('ForecastPeriodComponent', () => {
  let component: ForecastPeriodComponent;
  let fixture: ComponentFixture<ForecastPeriodComponent>;
  let loader: HarnessLoader;
  const datePipe = new DatePipe('en-US');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastPeriodComponent, MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the period input value', async () => {
    fixture.componentRef.setInput('period', mockPeriod);

    const paragraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('#detailed-forecast'),
    ).nativeElement;

    // Use the loader to get a MatCardHarness instance
    const cardHarness = await loader.getHarness(MatCardHarness.with({ selector: '#forecast' }));

    // Retrieve material card title and sub-title text
    const titleText = await cardHarness.getTitleText();
    const subTitleText = await cardHarness.getSubtitleText();

    expect(titleText).toContain(mockPeriod.name);
    expect(subTitleText).toContain(datePipe.transform(mockPeriod.startTime, 'longDate'));
    expect(paragraph.textContent).toContain(mockPeriod.detailedForecast);
  });
});
