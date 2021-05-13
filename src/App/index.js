/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI lib components
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Navigation
import AppNavigator from '../navigators/AppNavigator';

// State management
import { ThemeContext } from '../theme/theme-context';

// Local configurations
import appTheme from '../theme';
import mapping from '../theme/mapping.json';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

function App({ rootTarget, children }) {
  /* ********************************** HOOKS ********************************* */

  const [theme, setTheme] = useState('light');

  /* ******************************** CALLBACKS ******************************* */

  function onChangeTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }

  /* ***************************** RENDER HELPERS ***************************** */

  /**
   * Tells whether the App container will be used to render the main
   * app or Storybook. This allows us to have a single point of mainteance
   * for both apps
   * @returns {ReactElement} Children to be rendered under the different providers
   */
  function getRootRenderingTarget() {
    if (rootTarget === 'mainApp') {
      return <AppNavigator />;
    } else if (rootTarget === 'storybook') {
      return children;
    }
  }

  /* ******************************** RENDERING ******************************* */

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, onChangeTheme }}>
        <ApplicationProvider
          {...eva}
          theme={{ ...eva[theme], ...appTheme[theme] }}
          customMapping={mapping}
        >
          {getRootRenderingTarget()}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

App.propTypes = {
  rootTarget: PropTypes.oneOf(['mainApp', 'storybook']),
};

App.defaultProps = {
  rootTarget: 'mainApp',
};

export default App;
