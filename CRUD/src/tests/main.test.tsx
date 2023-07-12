// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderTest from './helpers/RenderTest';
// import { vi } from 'vitest';
// import { product } from './mocks/products';

// const URL= 'https://api.mercadolibre.com/sites/MLB/search?q=$computador}';

// describe('Testa página Main e suas funcionalidades.', () => {
//   beforeEach(() => {
//     global.fetch = vi.fn(async (endpoint) => ({
//       json: async () => {
//         if( endpoint === URL){
//           return product;
//         }
//         return undefined;
//       }
//     }))
//   })
//   it('Verifica se API é chamada de forma correta.', () => {
//     expect(global.fetch).toBeCalledWith(URL);
//   });
// });
