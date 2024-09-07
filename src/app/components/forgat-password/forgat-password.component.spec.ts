import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgatPasswordComponent } from './forgat-password.component';

describe('ForgatPasswordComponent', () => {
  let component: ForgatPasswordComponent;
  let fixture: ComponentFixture<ForgatPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgatPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgatPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
