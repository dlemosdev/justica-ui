import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {JUSTICA_CORE_CONFIG} from '@justica/core';

import {JUSTICA_UI_CONFIG} from '../../../configs/justica-ui.config';
import {MenuService} from './menu.service';
import {JusticaMenu} from '../../../models/justica-menu.model';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: JUSTICA_UI_CONFIG,
          useValue: {exibirMenu: true}
        },
        {
          provide: JUSTICA_CORE_CONFIG,
          useValue: {urlApi: '/api/'}
        }
      ]
    });
    service = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    const requisicao = httpMock.expectOne('/api/gestao/menu');
    requisicao.flush([]);
  });

  it('deve filtrar apenas itens explicitamente inativos ou invisiveis', () => {
    const menus: JusticaMenu[][] = [];

    service.menu$.subscribe((itens) => menus.push(itens));

    const requisicao = httpMock.expectOne('/api/gestao/menu');
    requisicao.flush([
      {label: 'Visivel por padrao'},
      {label: 'Ativo explicito', active: true, visible: true},
      {label: 'Inativo', active: false},
      {label: 'Invisivel', visible: false}
    ]);

    expect(menus[0].map((item) => item.label)).toEqual([
      'Visivel por padrao',
      'Ativo explicito'
    ]);
  });
});
