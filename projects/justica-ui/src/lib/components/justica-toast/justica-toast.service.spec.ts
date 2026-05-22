import {fakeAsync, tick} from '@angular/core/testing';

import {JusticaToast} from '../../models/justica-toast.model';
import {JusticaToastService} from './justica-toast.service';

describe('JusticaToastService', () => {
  let service: JusticaToastService;
  let toasts: JusticaToast[];

  beforeEach(() => {
    service = new JusticaToastService();
    toasts = [];
    service.toasts$.subscribe((valor) => {
      toasts = valor;
    });
  });

  afterEach(() => {
    service.limpar();
  });

  it('deve exibir toast com valores padrao', () => {
    const id = service.exibir({
      titulo: 'Atualização disponível',
      descricao: 'Versão pronta para instalar'
    });

    expect(id).toBeTruthy();
    expect(toasts.length).toBe(1);
    expect(toasts[0].tipo).toBe('info');
    expect(toasts[0].duracaoMs).toBe(5000);
    expect(toasts[0].fecharManual).toBeTrue();
    expect(toasts[0].posicaoVertical).toBe('topo');
    expect(toasts[0].posicaoHorizontal).toBe('direita');
  });

  it('deve fechar apenas o toast informado', () => {
    const primeiroId = service.exibir({
      titulo: 'Primeiro',
      descricao: 'Primeira descrição',
      duracaoMs: 0
    });
    const segundoId = service.exibir({
      titulo: 'Segundo',
      descricao: 'Segunda descrição',
      duracaoMs: 0
    });

    service.fechar(primeiroId);

    expect(toasts.length).toBe(1);
    expect(toasts[0].id).toBe(segundoId);
  });

  it('deve remover automaticamente apos duracao configurada', fakeAsync(() => {
    service.exibir({
      titulo: 'Temporário',
      descricao: 'Fecha sozinho',
      duracaoMs: 100
    });

    expect(toasts.length).toBe(1);

    tick(100);

    expect(toasts.length).toBe(0);
  }));

  it('nao deve remover automaticamente quando duracao for menor ou igual a zero', fakeAsync(() => {
    service.exibir({
      titulo: 'Persistente',
      descricao: 'Não fecha sozinho',
      duracaoMs: 0
    });

    tick(5000);

    expect(toasts.length).toBe(1);
  }));

  it('deve limpar todos os toasts', () => {
    service.exibir({titulo: 'Um', descricao: 'Primeiro', duracaoMs: 0});
    service.exibir({titulo: 'Dois', descricao: 'Segundo', duracaoMs: 0});

    service.limpar();

    expect(toasts.length).toBe(0);
  });
});
