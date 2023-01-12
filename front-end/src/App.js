import { lazy, Suspense, useState } from 'react';
import { AppBar, Loading } from './components';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const Login = lazy(() => import('./pages/login/login'));
const Dashboard = lazy(() => import('./pages/dashboard/dashboard'));

const ListCategory = lazy(() => import('./pages/category/list'));
const FormCategory = lazy(() => import('./pages/category/form'));

const ListProduct = lazy(() => import('./pages/product/list'));
const FormProduct = lazy(() => import('./pages/product/form'));

const ListUser = lazy(() => import('./pages/user/list'));
const FormUser = lazy(() => import('./pages/user/form'));

const ListSeller = lazy(() => import('./pages/seller/list'));
const NotFound = lazy(() => import('./pages/not-found/not-found'));

function App() {
  const [currentRoute, setCurrentRoute] = useState('/');

  return <Router>
           { currentRoute !== '/login' ? <AppBar/> : ''}
           <Suspense fallback={<Loading/>}>
              <Routes>
                <Route path="/" element={<Dashboard setCurrentRoute={setCurrentRoute}/>} />
                <Route path="/login" element={<Login setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/category" element={<ListCategory setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/category/new" element={<FormCategory setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/category/edit/:id" element={<FormCategory setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/product" element={<ListProduct setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/product/new" element={<FormProduct setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/product/edit/:id" element={<FormProduct setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/user" element={<ListUser setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/user/new" element={<FormUser setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/user/edit/:id" element={<FormUser setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="/seller" element={<ListSeller setCurrentRoute={setCurrentRoute}/>}/>
                <Route path="*" element={<NotFound setCurrentRoute={setCurrentRoute}/>}/>
              </Routes>
           </Suspense>
         </Router>;
}

export default App;
