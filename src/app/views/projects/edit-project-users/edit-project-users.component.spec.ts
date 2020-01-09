import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectUsersComponent } from './edit-project-users.component';

describe('EditProjectUsersComponent', () => {
  let component: EditProjectUsersComponent;
  let fixture: ComponentFixture<EditProjectUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditProjectUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
