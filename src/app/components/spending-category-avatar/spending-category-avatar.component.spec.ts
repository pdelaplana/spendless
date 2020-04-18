import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpendingCategoryAvatarComponent } from './spending-category-avatar.component';

describe('SpendingCategoryAvatarComponent', () => {
  let component: SpendingCategoryAvatarComponent;
  let fixture: ComponentFixture<SpendingCategoryAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingCategoryAvatarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingCategoryAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
