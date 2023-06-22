import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../../App';
import { store } from '../../app/store';

const renderTest = (path: string) => {
    return render (
        <MemoryRouter initialEntries={[path]}>
            <Provider store={ store }>
                <App />
            </Provider>
        </MemoryRouter>
    )
}

export default renderTest;