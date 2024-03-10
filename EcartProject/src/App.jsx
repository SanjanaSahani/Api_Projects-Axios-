import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [res, setRes] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController()
      ;(async () => {
        try {
          setLoading(true)
          setError(false)
          const response = await axios.get(
            'https://api.escuelajs.co/api/v1/products/?title='+search , {signal: controller.signal});
          console.log(response.data);
          setRes(response.data);
          setLoading(false)
        } catch (error) {
          if(axios.isCancel(error)){
            console.log('Request Canceled', error.message)
            return
          }
          console.error(error);
          setError(true)
          setLoading(false)
        }
      })();

      //cleanup method
      return () => {
        controller.abort()
      }
   
  }, [search]);

  if(error){
    return <h1 className='text-3xl font-bold text-center'>Something Went Wrong</h1>
  }

  if(loading){
    return <h1 className='text-3xl font-bold text-center'>Loading...</h1>
  }

  return (
    <>
      <h1 className='text-3xl font-bold text-center'>API Handling With Axios</h1>

      <input
      className='ml-[42%] border-2 border-black mt-4 rounded-sm'
        type='text'
        placeholder='Search Product'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

<div className='grid grid-cols-4 m-4'>
{res.map((card) => {
const {id,images,title,price, description} = card
return <div className='border-2 border-black gap-1 p-2 m-4 text-center' key={id}>
  {/* <h1>{id}</h1> */}
  <img className='h-40 w-full' src={images} alt={card.id} />
  <h1>{title.slice(0,30)}</h1>
  <p>${price}</p>
  <p>{description.slice(1,100)}</p>
  <button className='bg-pink-300 p-2 w-full rounded-sm text-black font-bold'>buy</button>
</div>
})}

</div>



    </>
  );
}

export default App;

