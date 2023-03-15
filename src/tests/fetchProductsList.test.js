import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    const response = await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const response = await fetchProductsList('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('fetchProductList retorna igual ao objeto ComputadorSearch', async () => {
    const response= await fetchProductsList('computador');
    expect(response).toMatchObject(computadorSearch);
  })
  it('fetchProductList sem argumento retorna a mensagem de erro', async () => {
    try {
      await fetchProductsList();
    } catch (error) {
      console.log(error.message);
      expect(error.message).toBe('Termo de busca não informado');
    }
  });
});
