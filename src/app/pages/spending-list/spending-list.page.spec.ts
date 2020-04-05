import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendingListPage } from './spending-list.page';

describe('SpendingListPage', () => {
  let component: SpendingListPage;
  let fixture: ComponentFixture<SpendingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
