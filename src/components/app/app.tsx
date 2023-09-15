import React, {useEffect} from "react";
import {Route, Routes, useLocation} from 'react-router-dom'
import {Index} from '../../pages'
import {NotFound404} from '../../pages/not-found-404/not-found-404'
import Login from '../../pages/login/login'
import Register from '../../pages/register/register'
import ForgotPassword from '../../pages/forgot-password/forgot-password'
import Profile from '../../pages/profile/profile'
import IngredientDetails from '../ingredient-details/ingredient-details'
import ResetPassword from '../../pages/reset-password/reset-password'
import Feed from '../../pages/feed/feed'
import OrderDescription from '../order-description/order-description'
import Orders from '../../pages/profile/orders/orders'
import ProtectedRouteElement from '../protected-route-element/protected-route-element'
import {useSelector, useDispatch} from "../../services/hooks";
import {getUser} from "../../utils/api-wrappers"
import {getIngredients} from "../../utils/api-wrappers"
import Modal from "../modal/modal";
import LoadingScreen from '../loading-screen/loading-screen'
import AppHeader from '../app-header/app-header'
import OrderCreated from "../order-created/order-created";

export default function App():JSX.Element {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const state = useSelector((store) => store.loader)
  useEffect(() => {
    dispatch(getUser()) // Проверка пользователя
    dispatch(getIngredients()) // Загрузка данных из API
  }, [])

  return (
    <>
      {state.isLoading ? <LoadingScreen/> :
        state.hasError ? <p className={`text text_type_main-large`}>Ошибка загрузки данных...</p>
          : <>
            <AppHeader/>
            <Routes>
              <Route path="/" element={<Index/>}/>
              <Route path="/ordercreated" element={<Index/>}/>
              <Route path="login" element={<ProtectedRouteElement component={<Login/>} onlyUnAuth={true}/>}/>
              <Route path="register" element={<ProtectedRouteElement component={<Register/>} onlyUnAuth={true}/>}/>
              <Route path="forgot-password"
                     element={<ProtectedRouteElement component={<ForgotPassword/>} onlyUnAuth={true}/>}/>
              {background === "forgot-password"
                && <Route path="reset-password"
                          element={<ProtectedRouteElement component={<ResetPassword/>} onlyUnAuth={true}/>}/>
              }
              <Route path="profile" element={<ProtectedRouteElement component={<Profile/>}/>}/>
              <Route path="profile/orders" element={<ProtectedRouteElement component={<Orders/>}/>}/>
              {background
                ? <Route path="profile/orders/:id" element={<ProtectedRouteElement component={<Orders/>}/>}/>
                : <Route path="profile/orders/:id" element={<ProtectedRouteElement component={<OrderDescription/>}/>}/>
              }
              <Route path="feed" element={<Feed/>}/>
              {background
                ? <Route path="/feed/:id" element={<Feed/>}/>
                : <Route path="/feed/:id" element={<OrderDescription/>}/>
              }
              {background
                ? <Route path="/ingredients/:id" element={<Index/>}/>
                : <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
              }
              <Route path="*" element={<NotFound404/>}/>
            </Routes>
            {background && (
              <Routes>
                <Route path="/feed/:id" element={<Modal> <OrderDescription/> </Modal>}/>
                <Route path="/ingredients/:id" element={<Modal> <IngredientDetails/> </Modal>}/>
                <Route path="/ordercreated" element={<Modal> <OrderCreated/> </Modal>}/>
                <Route path="profile/orders/:id"
                       element={<ProtectedRouteElement component={<Modal> <OrderDescription/></Modal>}/>}/>
              </Routes>
            )}
          </>
      }
    </>
  )
}
