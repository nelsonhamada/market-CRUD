import { fireEvent, screen, waitFor } from '@testing-library/react';
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
  
  const enviarbtn: HTMLButtonElement = screen.getByRole('button', {
    name: /enviar/i,
  })
  screen.getByTestId('review-form')
  expect(enviarbtn).toBeDisabled
  });

  it('Testa se avaliação botão é ativado quando formulário é preenchido corretamente.', async () => {
    renderTest('/MLB2879099010');
  
    await waitFor(() => {
      screen.getByText(/teste/i);
      screen.getByText(/exemplo@email\.com/i);
    });
    
    screen.getByTestId('review-form');
    const radio: HTMLInputElement = screen.getByRole('radio', { name: '4' });
    expect(radio).not.toBeChecked();
    userEvent.click(radio);
    await userEvent.type(screen.getByRole('textbox'),'Excelete produto!');
    const sendbtn: HTMLButtonElement = screen.getByRole('button', {
      name: /enviar/i,
    });
    expect(sendbtn).not.toBeDisabled();
    fireEvent.click(sendbtn);
    
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /nota: 4\/5/i,
      });
      screen.getByText(/Excelete produto!/i);
    }); 
    
     const deleteBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /excluir/i
    })

    fireEvent.click(deleteBtn);

    await expect(screen.queryByText(/Excelete produto!/i)).not.toBeInTheDocument();
  });

  it('Testa botão de edit do formulário.', async () => {
    renderTest('/MLB2879099010');

    const radio: HTMLInputElement = screen.getByRole('radio', { name: '4' });
    let sendbtn = screen.getByRole('button', {
      name: /enviar/i,
    });
    expect(radio).not.toBeChecked();
    fireEvent.click(radio);
    await userEvent.type(screen.getByRole('textbox'),'Excelete produto!');
    expect(sendbtn).not.toBeDisabled()
    fireEvent.click(sendbtn);
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /nota: 4\/5/i,
      });
      screen.getByText(/Excelete produto!/i);
    }); 
    const editBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /editar/i
    });
    fireEvent.click(editBtn);
    await userEvent.type(screen.getByRole('textbox'),'{backspace}.');
    sendbtn = screen.getByRole('button', {
      name: /enviar/i,
    });
    fireEvent.click(sendbtn)

    await waitFor(() => {
      screen.getByRole('heading', {
        name: /nota: 4\/5/i,
      });
      screen.getByText(/Excelete produto./i);
    }); 
  });
});

