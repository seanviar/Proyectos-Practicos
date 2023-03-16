import debounce from 'just-debounce-it'
import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

function App () {
  const apikey = 'apikey=eda8a775'
  const urlPelis = 'http://www.omdbapi.com/?'

  const [movies, setMovies] = useState([])
  const prevSearch = useRef('')
  const [order, setOrder] = useState(false)
  const prevMovies = useRef([])
  const [search, setSearch] = useState('')

  const functionSearch = useCallback(async (search) => {
    if (prevSearch.current === search) return
    const res = await fetch(`${urlPelis}${apikey}&s=${search}`)
    const data = await res.json()
    setMovies(data.Search)
    prevSearch.current = search
    prevMovies.current = movies
    setOrder(false)
  }
  , [])

  const handleSort = useCallback((movies) => {
    if (!order) {
      prevMovies.current = movies
      const ordenada = [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      setMovies(ordenada)
      setOrder(!order)
    } else {
      setMovies(prevMovies.current)
      setOrder(!order)
    }
  }, [order])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const debounceSearch = useCallback(debounce((search) => { functionSearch(search) }, 1000), [])

  useEffect(() => { debounceSearch(search) }, [search])

  return (
    <main className='App'>mi app
      <form action='' className='form' onSubmit={functionSearch}>
        <input name='search' type='search' onChange={(e) => handleChange(e)} />
        <button type='submit'> buscar</button>
        <input checked={order} type='checkbox' onChange={() => { handleSort(movies) }} />
      </form>

      <section className='movies'>

        {movies
          ? movies.map(movie => (
            <article className='movie' key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <h3>{movie.Year}</h3>
              <img src={movie.Poster} onError={(e) => { e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXm5uaztbTi4uK2uLfp6emwsrHZ2dnl5eXf39+8vr20trW5u7rU1NTAwcCtr67JysrIycjP0dCVZb+pAAAFi0lEQVR4nO2bjZKrKBBGRRsEBYH3f9ltFE0yI8aZSa1y6zu1ezNRTHFC80+aBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuB/9MVdn76+QNd0xxtLVmfwL5KV4h/QVK5J9L8iKNZfieEJQiLHeyqjPFCEXor46o7/mVJCmML06o7/lTDszG4ZqK6I7JSiEuzqjv6U/19AI0dXa1LTngpTDtL06q7+D1GlDVUlFpKZVz5xsaNKw5uW5trmrsB3lKycFk+MLY7xaZZfW/MDonbC5Yc1sx88JsmJ3P0X3SUFWvF0fea7d/EH9lOpqpVconJgISuOjVTZ6c0bS3atBfTt8kSIoYjhtelFBvJO82Zyq7d7kN7SvRUKtf/PEzdqaY0Pp9PeQI33cONVkKH3hqcNBT02GxXUYsv+E4WOhiahV1lrV0nbloJOpxlDGrENNNEuHKExcx9YUi4q1GMq1WyM7PGTkFrlUbG5qMRzWfH4xkS53d/1Qt+Eao/23iYc0i2IxTisxXFdgdmJxHVv3pUerMMx7EvvllMu3VIh1GIplNbvdr2u5juqay9DMN0srw+uuk6nXMC9ml2parqWFL6AOw2VDorhBk2e5+9sbdRjOBuVxS25r9r+BKgyXhqY8/89RvN/UVGVYEOR58WK429RWZVgcXf8rhsWJbu4uKo7Sw7ZSbG3t/iSxDsOlrWwLgkLMEoW2tgrDdc2ztBe8jL1p/3YdhjmXhbWKHMTHz96F0twin7LYn8jn6VPBvw7DVWK3PxjyMZpCDFdimA8D7a2prVvbpVFrJYZrW/NdcRUstDP1GK6rpaS7Z0fZ5XX+8uG+WgwfJ0kodnlTTcpuXUQ9OJFSjeHjOBCR8m7sRufVtuhdnBzXZCjMYyOQFrb33xcZqzSU487eWoL00fGNigw5s7u7T6SOH6rJcG+LlNo3pzfqMkzb+Pqp/hHptxv5NzMsrHm+SI4+7RxSOv3mx/enMcarlV45dRw47R12XSdOnai53cHhwtL8H7jb8fazZ7rPcrsibD58sO1+x9oS/icHSo/9iudTroW0H78chf0VYgyFQdD1fCpfd/UD4N+Fblvt9J9+M7BNi1U4/hyrmjZeM8BR0x8e1l0uOS3doSGNnvR0ze/3FsN5USIHGm2vzcv75vnq8oCS6zLjsHzAlpK+JDbXGkYVjWu1MzZl1hmnllcV+Q8dTFjDyyq73OS03KFrJ/x8S7l0ADxd5OmgTSJRkbWcOH+iZcN2uubgPhuSE86O42jDpChKq8KkyU7RGhlJy6BCXkycEzqpSU2eL+o2CDvf0WGI2vLFdDOk9eMxUhBm/kQ1RWWkp/5KQ0OcDx5kdZwvy6HVWRKeqBWRTOAYc8scgVxHc6LOE79xT1HKFXK+aNxm6CUn5vrH/1E/8D8X/VJ4NmQBJZs5X6Std9L2E2eHTCTpQvCmy4Yp8yb2aUeNYtesho3tuLFJT8TxUYYmfQ2e5sT8ShdNFr8aemGC7Wy7Gk4heh+XhnIxHGM7l4bdNeyaL4bNZjhcs2bzxbCXNsWUpXmrggOSA5VDWL0YUjocnAzsk2G/XkyG/fAow7T4n0K1uegXQpvhlA05P2GyXJZKB34TJTeS6/nL1dALbm34O1BSLX2+HVhuWC5GqXs/PQz5Pf/Pbam/rsd3/hGllqd2kZUpDiLy+zQllmFJu7Q4HLoUJilj2rDI7SOXYdMETsnl2JtJBsdfQzbkxJNzqT+8qBDXrp7Wv/t5sdCmNcPO5gtr2i1hvvi483yxb7YBxPxH0y8DhP9b7RByY+rubrae+1Fa1w3mbmuBn4X6/l5hBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/JD/AOP/PHbUh5QkAAAAAElFTkSuQmCC' }} alt={movie.Title} />
            </article>)
          )
          : null}
      </section>
    </main>
  )
}

export default App
