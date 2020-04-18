import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDisplayNamePage } from './edit-display-name.page';

describe('EditDisplayNamePage', () => {
  let component: EditDisplayNamePage;
  let fixture: ComponentFixture<EditDisplayNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDisplayNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDisplayNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
