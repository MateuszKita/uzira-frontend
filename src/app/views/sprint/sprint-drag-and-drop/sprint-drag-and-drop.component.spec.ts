import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDragAndDropComponent } from './sprint-drag-and-drop.component';

describe('SprintDragAndDropComponent', () => {
  let component: SprintDragAndDropComponent;
  let fixture: ComponentFixture<SprintDragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintDragAndDropComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
