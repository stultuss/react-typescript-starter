import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import Entity from './containers/Entity';

// ========================================================
// Render Setup
// ========================================================
let MOUNT_NODE = document.getElementById('wrapper');
let ENTITY_COMPONENT = (process.env.NODE_ENV === 'development' && module.hot) ? hot(module)(Entity) : Entity;
let render = () => {
    ReactDom.render(
        <BrowserRouter>
            <ENTITY_COMPONENT/>
        </BrowserRouter>,
        MOUNT_NODE
    );
};

// ========================================================
// Redbox Plugin
// ========================================================
if (process.env.NODE_ENV === 'development' && module.hot) {
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require('redbox-react');
        ReactDom.render(<RedBox error={ error }/>, MOUNT_NODE);
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