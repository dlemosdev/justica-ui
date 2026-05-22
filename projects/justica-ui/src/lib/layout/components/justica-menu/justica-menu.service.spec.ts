import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {JUSTICA_CORE_CONFIG, JusticaDialogService} from '@justica/core';

import {JUSTICA_UI_CONFIG} from '../../../configs/justica-ui.config';
import {JusticaMenuService} from './justica-menu.service';
import {JusticaMenu} from '../../../models/justica-menu.model';

describe('MenuService', () => {
  let service: JusticaMenuService;
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
        },
        {
          provide: JusticaDialogService,
          useValue: jasmine.createSpyObj<JusticaDialogService>('JusticaDialogService', [
            'erro'
          ])
        }
      ]
    });
    service = TestBed.inject(JusticaMenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.menu$.subscribe();

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

  it('deve exibir dialogo e retornar menu vazio quando falhar ao carregar', () => {
    const menus: JusticaMenu[][] = [];
    const justicaDialogService = TestBed.inject(
      JusticaDialogService
    ) as jasmine.SpyObj<JusticaDialogService>;

    service.menu$.subscribe((itens) => menus.push(itens));

    const requisicao = httpMock.expectOne('/api/gestao/menu');
    requisicao.flush('Erro ao carregar menu', {
      status: 500,
      statusText: 'Internal Server Error'
    });

    expect(justicaDialogService.erro).toHaveBeenCalledWith(
      'Erro ao carregar menu',
      'Não foi possível carregar as opções do menu. Tente novamente mais tarde.'
    );
    expect(menus).toEqual([[]]);
  });
});
