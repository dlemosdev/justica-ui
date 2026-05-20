import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JusticaLogoutComponent} from './justica-logout.component';

describe('JusticaLogoutComponent', () => {
  let component: JusticaLogoutComponent;
  let fixture: ComponentFixture<JusticaLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JusticaLogoutComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JusticaLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
