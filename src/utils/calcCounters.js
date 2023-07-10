export default function calcCounters (arr)  {
  /* функция подсчета количества однотипных элементов
    params: arr: массив, в каждом элементе которого есть поле _id, в котором указан тип элемента
    return: объект c указанием котличетва эдементов каждого типа:
             {
               "type1": <number>,
               ...
               "typeN": <number>
             }
  */
  let res = {}
  arr.forEach(i => {
    if (res[i._id]) {
      res[i._id]++
    } else {
      res[i._id] = 1
    }
  })
  return res
}
