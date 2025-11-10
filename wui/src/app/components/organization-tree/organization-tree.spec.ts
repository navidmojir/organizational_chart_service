import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTree } from './organization-tree';

describe('OrganizationTree', () => {
  let component: OrganizationTree;
  let fixture: ComponentFixture<OrganizationTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
