import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtatGlobalDossierPage } from './etat-global-dossier.page';

describe('EtatGlobalDossierPage', () => {
  let component: EtatGlobalDossierPage;
  let fixture: ComponentFixture<EtatGlobalDossierPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatGlobalDossierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtatGlobalDossierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
