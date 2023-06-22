import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderTest from './helpers/RenderTest';

describe('Testando funcionalidade do formulário de login.', () => {
  it('Testa se formulário é renderizado', () => {
   renderTest('/');

   screen.getByRole('textbox', {name: /nome:/i,});
   screen.getByRole('textbox', {name: /email:/i,});
   screen.getByTestId('login-btn');
   
  });

  it('Testa se quando efetuado login renderiza nome, email de usuário e botão logout', async () => {    
    renderTest('/')  

    fireEvent.change(screen.getByTestId('input-name'),{ target: {value:'teste'}})
    fireEvent.change(screen.getByTestId('input-email'),{ target: {value:'exemplo@email.com'}})
    userEvent.click(screen.getByTestId('login-btn'))
   
  await waitFor(() => {
    screen.getByText(/teste/i);
    screen.getByText(/exemplo@email\.com/i);
    screen.getByTestId('logout-btn')
    userEvent.click(screen.getByTestId('logout-btn'));
  })

  await waitFor(() => {
    screen.getByRole('textbox', {name: /nome:/i,});
  })

  });
})
