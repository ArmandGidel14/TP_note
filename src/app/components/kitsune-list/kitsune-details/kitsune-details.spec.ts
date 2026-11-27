import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitsuneDetails } from './kitsune-details';

describe('KitsuneDetails', () => {
  let component: KitsuneDetails;
  let fixture: ComponentFixture<KitsuneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitsuneDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(KitsuneDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
