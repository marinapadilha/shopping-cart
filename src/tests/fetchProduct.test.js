import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Teste se fetchProduct e uma funcao', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Teste se fetch e chamado com fetchProduct("MLB1405519561")', async () => {
    const response = await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se fetch e chamado com o endpoint correto ao chamar fetchProduct("MLB1405519561")', async () => {
    const response = await fetchProduct('MLB1405519561');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1405519561';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Teste se fetchProduct("MLB1405519561") e um objeto igual a produto', async () => {
    const response = await fetchProduct('MLB1405519561');
    expect(response).toMatchObject(product);
  });
  it('Teste se fetchProduct se, argumento retorna a mensagem de error', async () => {
    try {
      await fetchProduct();
    } catch (error) {
      console.log(error.message);
      expect(error.message).toBe('ID não informado');
    }
  });
});
