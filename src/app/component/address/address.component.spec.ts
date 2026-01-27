import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure default state on creation', async () => {
    // Input fields
    const street: HTMLInputElement = fixture.debugElement.query(By.css('#street')).nativeElement;
    const city: HTMLInputElement = fixture.debugElement.query(By.css('#city')).nativeElement;

    // Drop down
    const selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '#state' }));
    const state = await selectHarness.getValueText();

    // Buttons
    const submit: HTMLButtonElement = fixture.debugElement.query(By.css('#submit')).nativeElement;
    const clear: HTMLButtonElement = fixture.debugElement.query(By.css('#clear')).nativeElement;

    expect(street.value).toBe('');
    expect(city.value).toBe('');
    expect(state).toBe('');
    expect(submit.disabled).toBeTruthy();
    expect(clear.disabled).toBeFalsy();
  });

  it('should ensure correct state when required fields have a valid value', async () => {
    const streetValue = '1535 Broadway';
    const cityValue = 'New York';

    // Input fields
    const street: HTMLInputElement = fixture.debugElement.query(By.css('#street')).nativeElement;
    const city: HTMLInputElement = fixture.debugElement.query(By.css('#city')).nativeElement;

    // Drop down
    const selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '#state' }));

    // Buttons
    const submit: HTMLButtonElement = fixture.debugElement.query(By.css('#submit')).nativeElement;
    const clear: HTMLButtonElement = fixture.debugElement.query(By.css('#clear')).nativeElement;

    // Set street value
    street.value = streetValue;
    street.dispatchEvent(new Event('input'));

    // Set city value
    city.value = cityValue;
    city.dispatchEvent(new Event('input'));

    // Set state value
    await selectHarness.clickOptions({ text: `${cityValue}` });

    fixture.detectChanges();

    expect(street.value).toBe(streetValue);
    expect(city.value).toBe(cityValue);
    expect(await selectHarness.getValueText()).toBe(cityValue);
    expect(submit.disabled).toBeFalsy();
    expect(clear.disabled).toBeFalsy();
  });

  it('should ensure correct state when clear button is clicked', async () => {
    const streetValue = '1535 Broadway';
    const cityValue = 'New York';

    // Input fields
    const street: HTMLInputElement = fixture.debugElement.query(By.css('#street')).nativeElement;
    const city: HTMLInputElement = fixture.debugElement.query(By.css('#city')).nativeElement;

    // Drop down
    const selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '#state' }));

    // Buttons
    const submit: HTMLButtonElement = fixture.debugElement.query(By.css('#submit')).nativeElement;
    const clear: HTMLButtonElement = fixture.debugElement.query(By.css('#clear')).nativeElement;

    // Set street value
    street.value = streetValue;
    street.dispatchEvent(new Event('input'));

    // Set city value
    city.value = cityValue;
    city.dispatchEvent(new Event('input'));

    // Set state value
    await selectHarness.clickOptions({ text: `${cityValue}` });

    fixture.detectChanges();

    expect(street.value).toBe(streetValue);
    expect(city.value).toBe(cityValue);
    expect(await selectHarness.getValueText()).toBe(cityValue);
    expect(submit.disabled).toBeFalsy();
    expect(clear.disabled).toBeFalsy();

    clear.click();

    fixture.detectChanges();

    expect(street.value).toBe('');
    expect(city.value).toBe('');
    expect(await selectHarness.getValueText()).toBe('');
    expect(submit.disabled).toBeTruthy();
    expect(clear.disabled).toBeFalsy();
  });
});
