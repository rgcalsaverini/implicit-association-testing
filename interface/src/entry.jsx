import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IatTest from 'components/IatTest';
import { store } from 'state_management';
import { colors } from 'base_styles';


/* eslint-disable no-unused-expressions */
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`;
/* eslint-enable no-unused-expressions */

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.primary,
    primary2Color: colors.primary,
    primary3Color: colors.primary,
    accent1Color: colors.secondary,
    accent2Color: colors.secondary,
    accent3Color: colors.secondary,
    alternateTextColor: colors.textOnPrimary,
  },
});

export default function () {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Switch>
            <Route path="/test/:templateId" component={IatTest} />
          </Switch>
        </MuiThemeProvider>
      </Provider>
    </Router>
    , document.getElementById('root'),
  );
}
