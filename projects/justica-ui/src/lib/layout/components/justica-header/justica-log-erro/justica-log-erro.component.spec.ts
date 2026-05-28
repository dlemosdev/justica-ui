import {CommonModule} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JusticaModalService} from '../../../../components/justica-modal/justica-modal.service';
import {JusticaLogErroComponent} from './justica-log-erro.component';
import {JusticaLogErroService} from './justica-log-erro.service';

describe('JusticaLogErroComponent', () => {
  let fixture: ComponentFixture<JusticaLogErroComponent>;
  let component: JusticaLogErroComponent;
  let service: jasmine.SpyObj<JusticaLogErroService>;
  let modalService: jasmine.SpyObj<JusticaModalService>;

  beforeEach(() => {
    service = jasmine.createSpyObj<JusticaLogErroService>('JusticaLogErroService', [
      'listarErros',
      'exportarHtml'
    ]);
    modalService = jasmine.createSpyObj<JusticaModalService>('JusticaModalService', [
      'fecharModal'
    ]);
    service.listarErros.and.returnValue([
      {
        modulo: 'Justica',
        data: new Date('2026-05-28T14:15:14.000Z'),
        erro: {
          status: 500,
          title: 'Internal Server Error',
          detail: 'Falha ao gerar PDF',
          path: '/api/documentos/1',
          error: 'Internal Server Error'
        }
      }
    ]);

    TestBed.configureTestingModule({
      declarations: [JusticaLogErroComponent],
      imports: [CommonModule],
      providers: [
        {
          provide: JusticaLogErroService,
          useValue: service
        },
        {
          provide: JusticaModalService,
          useValue: modalService
        }
      ]
    });

    fixture = TestBed.createComponent(JusticaLogErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve carregar logs usando o service', () => {
    expect(service.listarErros).toHaveBeenCalled();
    expect(component.logs.length).toBe(1);

    const texto = fixture.nativeElement.textContent as string;
    expect(texto).toContain('Diário de Erros');
    expect(texto).toContain('Módulo: Justica');
    expect(texto).toContain('Falha ao gerar PDF');
    expect(texto).toContain('500');
  });

  it('deve alternar exibicao dos detalhes', () => {
    expect(component.detalhesVisiveis[0]).toBeUndefined();

    component.mostrarDetalhe(0);
    fixture.detectChanges();

    expect(component.detalhesVisiveis[0]).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('/api/documentos/1');
  });

  it('deve exportar logs atuais', () => {
    component.exportar();

    expect(service.exportarHtml).toHaveBeenCalledWith('lista_erros.html', component.logs);
  });

  it('deve fechar a modal pelo service', () => {
    component.fecharLog();

    expect(modalService.fecharModal).toHaveBeenCalled();
  });
});
