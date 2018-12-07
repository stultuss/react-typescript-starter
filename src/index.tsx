import * as React from 'react';
import * as ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AppContainer from './containers/App';

// ========================================================
// Render Setup
// ========================================================
let node = document.getElementById('wrapper');
let render = () => {
    ReactDom.render(
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>,
        node
    );
};

// ========================================================
// Redbox Plugin
// ========================================================
if (process.env.NODE_ENV === 'development' && module.hot) {
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require('redbox-react');
        ReactDom.render(<RedBox error={ error }/>, node);
    };

    render = () => {
        try {
            return renderApp();
        } catch (error) {
            renderError(error);
        }
    };
}

// ========================================================
// Go!
// ========================================================
render();