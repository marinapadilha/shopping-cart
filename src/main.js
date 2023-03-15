import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const totalPriceEl = document.querySelector('.total-price');
const productsEl = document.querySelector('.products');

// Adiciona 'carregando' durante a requisicao a API:
const loadingEl = document.createElement('p');
loadingEl.innerHTML = '<p class="loading">carregando...</p>';
productsEl.appendChild(loadingEl);
// Cria listagem de produtos;
const createProductsList = async () => {
  try {
    const productsList = await fetchProductsList('computador');
    productsEl.removeChild(loadingEl); // remove elemento de loading;
    productsList.forEach((product) => {
      const { id, title, thumbnail, price } = product;
      const components = createProductElement({ id, title, thumbnail, price });
      productsEl.appendChild(components);
    });
  } catch {
    const errorEl = document.createElement('p');
    errorEl.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    errorEl.className = 'error';
    productsEl.appendChild(errorEl);
  }
};

async function recoverPrice() {
  const cartIDs = getSavedCartIDs();
  const products = await Promise.all(cartIDs.map(fetchProduct));
  const sumTotal = products.reduce((acc, item) => acc + item.price, 0);
  totalPriceEl.innerHTML = sumTotal.toFixed(2);
  console.log(totalPriceEl);
}
export default async function recoverCart() {
  const productsSaved = getSavedCartIDs();
  recoverPrice();
  const arrayOfPromisses = productsSaved
    .map((element) => fetchProduct(element));
  const correctOrder = await Promise.allSettled(arrayOfPromisses);
  const cart = document.querySelector('.cart__products');
  const cartItems = correctOrder.forEach((item) => {
    cart.appendChild(createCartProductElement(item.value));
  });
  return (cartItems);
}
window.onload = async () => {
  await createProductsList();
  recoverCart();
};
