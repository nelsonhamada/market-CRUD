import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../App';
import { store } from '../../app/store';

const renderTest = (path: string) => {
    return render (
        <Provider store={ store }>
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>
        </Provider>
    )
}

export default renderTest;