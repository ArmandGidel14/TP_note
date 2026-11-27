import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitsuneBataille } from './kitsune-bataille';

describe('KitsuneBataille', () => {
  let component: KitsuneBataille;
  let fixture: ComponentFixture<KitsuneBataille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitsuneBataille],
    }).compileComponents();

    fixture = TestBed.createComponent(KitsuneBataille);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
