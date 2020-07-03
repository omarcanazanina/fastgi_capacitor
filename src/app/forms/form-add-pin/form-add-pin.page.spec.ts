import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAddPinPage } from './form-add-pin.page';

describe('FormAddPinPage', () => {
  let component: FormAddPinPage;
  let fixture: ComponentFixture<FormAddPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddPinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAddPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
