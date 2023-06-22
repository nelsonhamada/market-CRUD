import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderTest from './helpers/RenderTest';
import { act } from 'react-dom/test-utils';

describe('Testando funcionalidade do formulário de login.', () => {
  it('Testa se formulário é renderizado', () => {
   renderTest('/');

   screen.getByRole('textbox', {name: /nome:/i,});
   screen.getByRole('textbox', {name: /email:/i,});
   screen.getByTestId('login-btn');
   
  });

  it('Testa se quando efetuado login renderiza nome, email de usuário e botão logout', () => {
    renderTest('/');

  userEvent.type(screen.getByRole('textbox', {name: /nome:/i,}), 'teste');
  userEvent.type(screen.getByRole('textbox', {name: /email:/i,}), 'exemplo@email.com');
  userEvent.click(screen.getByTestId('login-btn'));
  
  // screen.getByText(/test/i);
  // screen.getByText(/exemplo@email\.com/i);
  // userEvent.click(screen.getByTestId('logout-btn'));

  // screen.getByRole('textbox', {name: /nome:/i,});

  });
})
