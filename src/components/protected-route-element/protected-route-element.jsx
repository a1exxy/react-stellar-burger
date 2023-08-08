// Защищенные пути

import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen'

export default function ProtectedRouteElement({ onlyUnAuth = false, component }) {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // console.info(`[ProtectedRouteElement] Case: #1`)
    return <LoadingScreen />;
  }

  if (onlyUnAuth && user) {
    // console.info(`[ProtectedRouteElement] Case: #2`)
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // console.info(`[ProtectedRouteElement] Case: #3`)
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  // console.info(`[ProtectedRouteElement] Case: #4`)
  return component;
};
