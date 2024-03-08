import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
 

  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        // console.log(res.data);
        setData(res.data)
        setLoading(false)
      } catch (error) {
        // console.log(error.message);
        setError(true)
        setLoading(false)
      }
    })()
  }, [])

  if (error) {
    return <h1 className='text-4xl font-bold text-slate-800 text-center'>Something Went Wrong</h1>
  }

   if (loading) {
    return <h1 className='text-4xl font-bold text-slate-800 text-center'>Loading...</h1>
   }


  return (
    <>
      <h1 className='font-bold text-center text-4xl'>API Handling with Axios</h1>
      <h1 className='text-center text-xl m-6'> Data : {data.length}</h1>

      {/* <input
      className='w-[150] border-black border-2 rounded-md ml-[43%] '
      type="text"
      placeholder='Search'
      value={search}
      onChange={(e) => {setSearch(e.target.value)}} /> */}

      <div className='grid grid-cols-4 gap-2 m-6'>
        {data.map((post) => {
          const { id, title, body } = post
          return <div className='border-2 p-2' key={id}>
           
            <h1 className='text-center text-xl font-bold'>{title.slice(1,20)}</h1>
            <p className='text-center'>{body.slice(1,100)}</p>
          </div>
        })}
      </div>
    </>
  )
}

export default App
