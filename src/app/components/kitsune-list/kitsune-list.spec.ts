import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitsuneList } from './kitsune-list';

describe('KitsuneList', () => {
  let component: KitsuneList;
  let fixture: ComponentFixture<KitsuneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitsuneList],
    }).compileComponents();

    fixture = TestBed.createComponent(KitsuneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
