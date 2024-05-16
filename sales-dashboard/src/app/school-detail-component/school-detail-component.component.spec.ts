import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailComponentComponent } from './school-detail-component.component';

describe('SchoolDetailComponentComponent', () => {
  let component: SchoolDetailComponentComponent;
  let fixture: ComponentFixture<SchoolDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolDetailComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
