import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEmailPage } from './edit-email.page';

describe('EditEmailPage', () => {
  let component: EditEmailPage;
  let fixture: ComponentFixture<EditEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
