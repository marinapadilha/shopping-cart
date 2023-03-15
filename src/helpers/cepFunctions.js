const cartAddress = document.querySelector('.cart__address');
const cepInput = document.querySelector('.cep-input');

export const getAddress = async (CEP) => {
  const url1 = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const url2 = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  try {
    const promise = await Promise.any([fetch(url2), fetch(url1)]);
    const data = await promise.json();
    console.log(data);
    return data;
  } catch {
    cartAddress.innerText = 'CEP não encontrado';
  }
};
export const searchCep = async () => {
  const cep = cepInput.value;
  const cepLength = 8;
  if (!Number(cep) || cep.length !== cepLength) {
    cartAddress.innerText = 'CEP não encontrado';
  } else {
    const data = await getAddress(cep);
    cartAddress.innerText = `${data.address
      || data.street} - ${data.district
      || data.neighborhood} - ${data.city} - ${data.state}`;
  }
};
