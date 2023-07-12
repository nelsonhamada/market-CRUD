import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderTest from './helpers/RenderTest';

describe('Formulário de login.', () => {
  it('Testa se formulário é renderizado', () => {
    renderTest('/');

    screen.getByPlaceholderText('Nome');
    screen.getByPlaceholderText('Email');
    screen.getByTestId('login-btn');
   
  });

  it('Testa se quando efetuado login renderiza nome, email de usuário e botão logout', async () => {    
    renderTest('/');

    await userEvent.type(screen.getByTestId('input-name'),'teste');
    await userEvent.type(screen.getByTestId('input-email'),'exemplo@email.com');
    userEvent.click(screen.getByTestId('login-btn'));
   
    await waitFor(() => {
      screen.getByText(/teste/i);
      screen.getByText(/exemplo@email\.com/i);
      screen.getByTestId('logout-btn');
      userEvent.click(screen.getByTestId('logout-btn'));
    });

    await waitFor(() => {
      screen.getByRole('heading', {
        name: /efetue o login para avaliar um produto\./i
      });
    });

  });

  it('Verifica se botão permanece desabilitado se os campos não forem validados.', async () => {
    renderTest('/')

      expect(screen.getByTestId('login-btn')).toBeDisabled();
      
      await userEvent.type(screen.getByTestId('input-name'),'teste')
      await userEvent.type(screen.getByTestId('input-email'),'exemplo@email.com')
      await waitFor(() => {
        expect(screen.getByTestId('login-btn')).not.toBeDisabled();
      });

  });
})
