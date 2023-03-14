import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [position, setPosiion] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handlemove = (e) => {
      setPosiion({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("pointermove", handlemove)

    return () => {
      window.removeEventListener('pointermove', handlemove)
    }
  }, [position])


  return (<>
    <div className='circulo' style={{ transform: `translate(${position.x}px, ${position.y}px)` }}> </div>
    <div>gh</div>

  </>
  )
}

export default App
