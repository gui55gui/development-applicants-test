import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListarWeatherComponent} from './listar-weather.component';

describe('ListarWeatherComponent', () => {
    let component: ListarWeatherComponent;
    let fixture: ComponentFixture<ListarWeatherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListarWeatherComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        /*
        fixture = TestBed.createComponent(ListarWeatherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        */
    });
});
