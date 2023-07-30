import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import { Index } from '../../pages/index'
import { NotFound404 } from '../../pages/notFound404/notFound404'
import Login from '../../pages/login/login'
import Register from '../../pages/register/register'
import ForgotPassword from '../../pages/forgotPassword/forgotPassword'
import Profile from '../../pages/profile/profile'
import IngredientDetails from '../ingredientDetails/ingredientDetails'
import ResetPassword from '../../pages/resetPassword/resetPassword'
import Feed from '../../pages/feed/feed'
import OrderDescription from '../orderDescription/orderDescription'
import Orders from '../../pages/profile/orders/orders'
import ProtectedRouteElement from '../protectedRouteElement/protectedRouteElement'
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients, getUser } from "../../utils/api"
import Modal from "../modal/modal";
import LoadingScreen from '../loadingScreen/loadingScreen'
import AppHeader from '../appHeader/appHeader'
import OrderCreated from "../orderCreated/orderCreated";
import {
  connect as connectFeet,
  disconnect as disconnectFeet,
} from "../../services/feed/actions";

const WS_ALL_ORDERS_URL = process.env.REACT_APP_WS_ALL_ORDERS_URL

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const state = useSelector(store => store.loader)

  const connect = () => dispatch(connectFeet(WS_ALL_ORDERS_URL));

  const disconnect = () => dispatch(disconnectFeet());

  useEffect(()=>{
    dispatch(getUser()) // Проверка пользователя
    dispatch(getIngredients()) // Загрузка данных из API
    connect() // Подклчение обновления всех заказов
    return () => {
      disconnect()
    }
  },[])

  return (
    <>
      { state.isLoading ? <LoadingScreen /> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p>
          : <>
            <AppHeader/>
            <Routes>
              <Route index element={<Index />} />
              <Route path="login" element={<ProtectedRouteElement component={<Login/>} onlyUnAuth={true} />} />
              <Route path="register" element={<ProtectedRouteElement component={<Register/>} onlyUnAuth={true} />} />
              <Route path="forgot-password" element={<ProtectedRouteElement component={<ForgotPassword/>} onlyUnAuth={true} />} />
              { background === "forgot-password"
                && <Route path="reset-password" element={<ProtectedRouteElement component={<ResetPassword/>} onlyUnAuth={true} />}/>
              }
              <Route path="profile" element={<ProtectedRouteElement component={<Profile />} />} />
              <Route path="profile/orders" element={<ProtectedRouteElement component={<Orders />} />} >
                <Route path=":id" element={<OrderDescription />} />
              </Route>
              <Route path="profile/orders/created" element={<ProtectedRouteElement component={<Modal><OrderCreated /></Modal>} />} />
              <Route path="feed" element={<Feed />} >
                <Route path=":id" element={<OrderDescription />} />
              </Route>
              { background
                ? <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>}/>
                : <Route path="/ingredients/:id" element={<IngredientDetails />}/>
              }
              <Route path="*" element={<NotFound404 />}/>
            </Routes>
          </>
      }
    </>
  )
}
