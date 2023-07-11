'use client'
import Alternativa from './alternativa'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useState } from 'react'

export default function Questao({ questao, responderHandler, setResposta, resposta }: any) {
  const handleChange = (event: any) => {
    setResposta((event.target as HTMLInputElement).value)
  }

  return (
    <div>
      <h1 className="text-2xl mb-2 font-bold">Q{questao?.id} - {questao?.enunciado}</h1>
      <div className="flex gap-3 items-center mb-3">
        <Chip
          size="small"
          label={'Elaborador: ' + questao?.elaborador?.nome}
          className="text-gray-400"
          variant="outlined"
        />
        <Chip
          size="small"
          label={'Categoria: ' + questao?.categoria?.nome}
          className="text-gray-400"
          variant="outlined"
        />
      </div>
      <div>
        <RadioGroup
          value={resposta}
          onChange={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          className="mb-3"
        >
          {questao?.alternativas?.map((alternativa: any, i: number) => (
            <Alternativa key={i} alternativa={alternativa} />
          ))}
        </RadioGroup>
      </div>
      <Button variant="outlined" onClick={responderHandler}>Responder</Button>
    </div>
  )
}
