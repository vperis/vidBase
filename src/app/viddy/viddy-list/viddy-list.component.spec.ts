/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViddyListComponent } from './video-list.component';

describe('ViddyListComponent', () => {
  let component: ViddyListComponent;
  let fixture: ComponentFixture<ViddyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViddyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViddyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
