import { Outlet, useParams } from 'react-router-dom';

export default function Feed () {
  const {id} = useParams()
  console.log(id)
  return (
    <>
      {id ? <Outlet /> : <p>Tут будет список всех заказов (Feed)</p>}
    </>
  )
}
