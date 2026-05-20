import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JusticaSidebarItemComponent} from './justica-sidebar-item.component';

describe('JusticaSidebarItemComponent', () => {
  let component: JusticaSidebarItemComponent;
  let fixture: ComponentFixture<JusticaSidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JusticaSidebarItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JusticaSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
