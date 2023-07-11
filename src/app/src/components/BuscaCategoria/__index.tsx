'use client'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { from, map, switchMap, toArray } from 'rxjs'

export default function BuscaCategoria({ token }: any) {
  const [categorias, setCategorias] = useState([])

  // console.log('token', token);
  

  // useEffect(() => {
  //   from(
  //     fetch('http://164.92.126.51:3000/categoria', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   )
  //     .pipe(
  //       switchMap(res => res.json()),
  //       switchMap((res: any) => from(res)),
  //       map((e: any, i: number) => {
  //         console.log(e);
          
  //         return {
  //           label: `#${i?.toString()} - ${e.nome}`,
  //           ...e,
  //         }
  //       }),
  //       toArray(),
  //     )
  //     .subscribe(res => {
  //       console.log(res)
  //       setCategorias(res as any)
  //     })
  // }, [])

  return (
    <Autocomplete
      id="combo-box-demo"
      disablePortal
      disableListWrap
      options={categorias}
      size="small"
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} />}
    />
  )
}