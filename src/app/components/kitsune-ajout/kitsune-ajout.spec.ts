import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitsuneAjout } from './kitsune-ajout';

describe('KitsunAjout', () => {
  let component: KitsuneAjout;
  let fixture: ComponentFixture<KitsuneAjout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitsuneAjout],
    }).compileComponents();

    fixture = TestBed.createComponent(KitsuneAjout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
