import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRemoveTryComponent } from './cart-remove-try.component';

describe('CartRemoveTryComponent', () => {
  let component: CartRemoveTryComponent;
  let fixture: ComponentFixture<CartRemoveTryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartRemoveTryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartRemoveTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
