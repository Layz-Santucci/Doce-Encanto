import { ConfirmacaoStore } from './use-confirmacao';

describe('ConfirmacaoStore', () => {
  it('resolve true ao confirmar e fecha o diálogo', async () => {
    const store = new ConfirmacaoStore();
    const resposta = store.perguntar({ titulo: 'T', mensagem: 'M' });
    expect(store.aberto()?.confirmar).toBe('Confirmar');
    store.responder(true);
    expect(await resposta).toBe(true);
    expect(store.aberto()).toBeNull();
  });

  it('nova pergunta cancela a anterior', async () => {
    const store = new ConfirmacaoStore();
    const primeira = store.perguntar({ titulo: '1', mensagem: '' });
    store.perguntar({ titulo: '2', mensagem: '' });
    expect(await primeira).toBe(false);
    expect(store.aberto()?.titulo).toBe('2');
  });
});
