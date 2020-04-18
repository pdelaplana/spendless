import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSpendingLimitPage } from './edit-spending-limit.page';

describe('EditSpendingLimitPage', () => {
  let component: EditSpendingLimitPage;
  let fixture: ComponentFixture<EditSpendingLimitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpendingLimitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSpendingLimitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
