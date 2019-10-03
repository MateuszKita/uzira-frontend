import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarMenuComponent } from './top-bar-menu.component';

describe('TopbarMenuComponent', () => {
  let component: TopBarMenuComponent;
  let fixture: ComponentFixture<TopBarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'uzira-frontend'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('UZira');
  });
});
