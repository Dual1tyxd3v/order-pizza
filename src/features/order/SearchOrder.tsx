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
      />
    </form>
  );
}

export default SearchOrder;
