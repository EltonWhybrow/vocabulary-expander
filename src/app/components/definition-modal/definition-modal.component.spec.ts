import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionModalComponent } from './definition-modal.component';

describe('DefinitionModalComponent', () => {
  let component: DefinitionModalComponent;
  let fixture: ComponentFixture<DefinitionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinitionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
