import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// List of available companies to choose from
const options = [
    { name: 'Google', ticker: 'GOOG' },
    { name: 'Facebook', ticker: 'FB' },
    { name: 'Oracle', ticker: 'ORCL' }
];
ReactDOM.render(<App options={options} />, document.querySelector('#app'));
if (module.hot) {
    module.hot.accept();
}
