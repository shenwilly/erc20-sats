import React from 'react';
import ReactDOM from 'react-dom';
import theme from "./utils/theme"
import App from './App';
import { ColorModeScript } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);