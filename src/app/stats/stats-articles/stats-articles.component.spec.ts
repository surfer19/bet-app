import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsArticlesComponent } from './stats-articles.component';

describe('StatsArticlesComponent', () => {
  let component: StatsArticlesComponent;
  let fixture: ComponentFixture<StatsArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
