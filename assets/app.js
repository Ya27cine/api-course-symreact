import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import CustomerPagination from './pages/customer/CustomerPagination';
import CustomerForm from './pages/customer/CustomerForm';
import Home from './pages/Home';
import InvoicePagination from './pages/invoice/InvoicePagination';
import Login from './pages/security/Login';
import AuthApi from './services/AuthApi';
import './styles/app.css';
import InvoiceForm from './pages/invoice/InvoiceForm';
import Register from './pages/security/Register.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PATHS } from './config';

// Load the JWT as soon as the React app starts
/** ===>  */  AuthApi.setup()
 
const App = () =>{
  // Transform NavBar component to NavbarWithRouter to have 'history' attribute.
  const NavbarWithRouter  = withRouter( Navbar ) 

  const [isAuthenticated, setIsAuthenticated] = useState( AuthApi.isAuthenticated() )
  return (
    <AuthContext.Provider 
      value={ {isAuthenticated, setIsAuthenticated} }>

        <HashRouter>
            <NavbarWithRouter  />
            <main className="container pt-5">
                <Switch>
                    <PrivateRoute  path={PATHS.PATH_CUSTOMERS + "/:id"} component={CustomerForm}       /> 
                    <PrivateRoute  path={PATHS.PATH_INVOICES  + "/:id"} component={InvoiceForm}        /> 
                    <PrivateRoute  path={PATHS.PATH_CUSTOMERS}          component={CustomerPagination} /> 
                    <PrivateRoute  path={PATHS.PATH_INVOICES}           component={InvoicePagination}  /> 
                    <Route         path={PATHS.PATH_REGISTER}           component={Register}           />
                    <Route         path={PATHS.PATH_LOGIN}              component={Login}              />
                    <Route         path={PATHS.PATH_MAIN}               component={Home}               />
                </Switch>
            </main>
        </HashRouter>
        <ToastContainer />
    </AuthContext.Provider>
    );
}
const el = document.querySelector('#app');
ReactDom.render(<App />, el)