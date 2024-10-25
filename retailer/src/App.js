 
import React from 'react';
import { ThemeProvider } from './ThemeContext'; // Make sure the import path is correct
import Main from './Main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;

