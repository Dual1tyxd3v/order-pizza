import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTS } from '../../const';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function onSubmitHandler(e: FormEvent) {
    e.preventDefault();

    if (!query) return;
    navigate(`${APP_ROUTS.ORDER}/${query}`);
  }
  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Enter order ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounder-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
