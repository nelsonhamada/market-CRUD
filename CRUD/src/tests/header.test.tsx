import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderTest from './helpers/RenderTest';

describe('Testando componente Header', () => {
  it('Testa se Header é renderizado', () => {
    renderTest('/');

      screen.getByTestId('header-input');
  });
});
