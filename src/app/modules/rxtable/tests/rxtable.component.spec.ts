import { RxTableHeaderComponent } from './../componets/rxtable-header.component';
import { RxTablePaginationComponent } from './../componets/rxtable-pagination.component';
import { RxTableForDirective } from './../componets/rxtable-tablefor.directive';
import { RxtableModule } from './../rxtable.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RxTableComponent } from './../components/rxtable.component';

describe('RxtableComponent', () => {
  let component: RxTableComponent;
  let fixture: ComponentFixture<RxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RxTableComponent,
        RxTableHeaderComponent,
        RxTablePaginationComponent,
        RxTableForDirective
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
