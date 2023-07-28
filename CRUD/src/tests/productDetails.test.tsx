import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderTest from './helpers/RenderTest';

describe('Testa formulário de avaliações.', () => {
  it('Testa se formulário não é renderizado quando usuário não está logado.', () => {
    renderTest('/MLB2879099010');
    
    screen.getByRole('heading', {
      name: /esse produto não tem avaliações!/i
    })
  });
  
  it('Testa se formulário é renderizado quando usuário está logado.', async () => {
    renderTest('/MLB2879099010');
    await userEvent.type(screen.getByTestId('input-name'),'teste');
    await userEvent.type(screen.getByTestId('input-email'),'exemplo@email.com');
    userEvent.click(screen.getByTestId('login-btn'));
  
    await waitFor(() => {
      screen.getByText(/teste/i);
      screen.getByText(/exemplo@email\.com/i);
  });  
  
  const enviarbtn = screen.getByRole('button', {
    name: /enviar/i,
  })
  screen.getByTestId('review-form')
  expect(enviarbtn).toBeDisabled
  });

  it('Testa se avaliação botão só ')
});


// Testar se botão enviar é ativado, se avaliação é enviada e funcionamento dos botões editar e excluir!