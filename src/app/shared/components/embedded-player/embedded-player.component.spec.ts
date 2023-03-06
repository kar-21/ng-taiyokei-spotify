import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedPlayerComponent } from './embedded-player.component';

describe('EmbeddedPlayerComponent', () => {
  let component: EmbeddedPlayerComponent;
  let fixture: ComponentFixture<EmbeddedPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbeddedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
