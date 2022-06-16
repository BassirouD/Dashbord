import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TendanceEvolutionJournalierePage } from './tendance-evolution-journaliere.page';

describe('TendanceEvolutionJournalierePage', () => {
  let component: TendanceEvolutionJournalierePage;
  let fixture: ComponentFixture<TendanceEvolutionJournalierePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TendanceEvolutionJournalierePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TendanceEvolutionJournalierePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
