import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeListNavComponent } from './poke-list-nav.component';

describe('PokeListNavComponent', () => {
  let component: PokeListNavComponent;
  let fixture: ComponentFixture<PokeListNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeListNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
