import { useState, useEffect } from 'react'
import { functionApiWord } from '../../services/fact'

export function useRefrechWord () {
  const [word, setWord] = useState('')
  const getRandonWord = () => { functionApiWord().then(setWord) }
  useEffect(() => {
    getRandonWord()
  }, [])
  return { word, getRandonWord }
}
