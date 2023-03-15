import { useFunctionApiImage } from './hooks/useCatImage'
import { useRefrechWord } from './hooks/useRefrechWord'
import './App.css'
function App () {
  const { word, getRandonWord } = useRefrechWord()
  const { image } = useFunctionApiImage({ word })

  const handleClick = () => {
    getRandonWord()
  }
  return (
    <main className='App'>
      <h2>Nuestra app</h2>
      <h4>
        {word}
      </h4>

      <img className='image' src={image} alt='' />
      <button onClick={handleClick}>nueva imagen</button>
    </main>
  )
}

export default App
