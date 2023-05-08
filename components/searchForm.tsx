import { useState } from 'react'

import { useRouter } from 'next/router'

const SearchForm = () => {
  const router = useRouter()

  const [query, setQuery] = useState(router.query.query || '');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push({
      pathname: '/',
      query: { query: query },
    })
  };

  return (
    <div className="container mx-auto bg-white shadow p-10 rounded my-8">
 
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">Place Search</h1>

        <form className="w-full flex gap-5" onSubmit={onSubmit}>        

          <input
              type="text"
              className="form-input block py-3 px-2 w-full rounded-md border-solid border-2 border-indigo-600"
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>

        </form>

    </div>
  )
}

export default SearchForm;