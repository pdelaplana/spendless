import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendTransactionPage } from './spend-transaction.page';

describe('SpendTransactionPage', () => {
  let component: SpendTransactionPage;
  let fixture: ComponentFixture<SpendTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendTransactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
