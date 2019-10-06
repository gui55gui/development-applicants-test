import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CadastrarWeatherComponent} from './cadastrar-weather.component';

describe('CadastrarWeatherComponent', () => {
    let component: CadastrarWeatherComponent;
    let fixture: ComponentFixture<CadastrarWeatherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CadastrarWeatherComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
      /*
      fixture = TestBed.createComponent(CadastrarWeatherComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      */
    });
});
