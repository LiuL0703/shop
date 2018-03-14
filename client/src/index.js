import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'


let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

ReactDOM.render(
    <App />,
    document.getElementById("app")
)

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}