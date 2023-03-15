import { useState, useEffect } from 'react'

export function useFunctionApiImage ({ word }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    if (word !== '') {
      fetch(`https://cataas.com/cat/cute/says/${word}`)
        .then(res => setImage(res.url))
    }
  }, [word])
  return { image }
}
