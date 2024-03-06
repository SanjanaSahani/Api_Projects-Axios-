import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [res, setRes] = useState({});
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      (async () => {
        try {
          setLoading(true)
          setError(false)
          const response = await axios.get(
            'https://www.deckofcardsapi.com/api/deck/new/draw/?count=' + search
          );
          console.log(response.data);
          setRes(response.data);
          setLoading(false)
        } catch (error) {
          console.error(error);
          setError(true)
          setLoading(false)
        }
      })();
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
      className='ml-[42%] border-2 border-black mt-4'
        type='text'
        placeholder='Search Card Number'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

     
  <div className='text-center m-2 text-xl'>   {res.deck_id && <p>id: {res.deck_id}</p>}
      {res.remaining && <h1>Remaining: {res.remaining}</h1>}
      </div>
      {res.cards && (
        <div>
          <h2 className='text-lg font-bold text-center m-2'>Cards:</h2>
          <div className='grid grid-cols-4 gap-1'>
            {res.cards.map((card) => (
              <div key={card.code}>
                <h3>Code: {card.code}</h3>
                <p>Value: {card.value}</p>
                <p>Suit: {card.suit}</p>
                <img src={card.image} alt={card.code} />
              </div>
            ))}
          </div>
        </div>
      )}
     
    </>
  );
}

export default App;

