import { Outlet, useParams } from 'react-router-dom';

export default function Orders () {
  const {id} = useParams()
  return (
    <>
      {id ? <Outlet /> : <p>Tут будет список заказов клиента (Orders)</p>}
    </>
  )
}
