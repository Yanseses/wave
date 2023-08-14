import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import { HashRouter } from 'react-router-dom';
import { initStore } from './services/store';
import { Provider } from 'react-redux';

export const store = initStore();

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);