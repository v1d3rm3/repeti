'use client'
import ButtonUi from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { JSX, useEffect, useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { from, switchMap } from 'rxjs'
import './hide-scrollbar.css'

import { Typography } from '@mui/material'
import Link from 'next/link'
import useDrag from './useDrag'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface Estudo {
  id: number
  itemId: string
  categoria: string
  nivel: string
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}

export default function Estudos({ className, token }: { className: string; token: string }) {
  const { dragStart, dragStop, dragMove, dragging } = useDrag()
  const [estudos, setEstudos] = useState<Estudo[]>([])

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) => {
      // evitar que selecione textos
      ev.preventDefault()
      ev.stopPropagation()
      dragMove(ev, posDiff => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })
    }

  useEffect(() => {
    from(
      fetch('http://164.92.126.51:3000/estudo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        cache: 'no-cache',
      }),
    )
      .pipe(switchMap(res => res.json()))
      .subscribe(data => {
        console.log('data')
        console.log(data)
        setEstudos(data)
      })
  }, [])

  const a: JSX.Element = <p>asd</p>

  return (
    <div className={`bg-gray-100 rounded border-2 ${className}`}>
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        itemClassName="p-3 cursor-grab"
      >
        {estudos?.map((v, i) => (
          <EstudoDetalhesCard categoria={v.categoria?.nome} key={i} estudoId={v.id} token={token} />
        ))}
        {/* <BotaoMaisEstudos /> */}
      </ScrollMenu>
    </div>
  )
}

function BotaoMaisEstudos() {
  return (
    <Link className="text-lg inline-block p-3 w-52 text-center underline" href={'/alguma-coisa'}>
      Ver mais estudos
    </Link>
  )
}

function EstudoDetalhesCard({ categoria, estudoId, token }: { categoria: string, estudoId: number, token: string }) {

  const router = useRouter()

  async function handleSubmit(studyId: number) {
    toast.success('Iniciando estudo...', {
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
    })
    localStorage.removeItem('total-questions')
    localStorage.removeItem('rigth-answers')
    router.push('/homework/' + studyId + '/' + token)
  }

  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent className="p-0">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Categoria
        </Typography>
        <Typography variant="h5" component="div">
          {categoria}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonUi size="small" onClick={() => handleSubmit(estudoId)}>Estudar agora!</ButtonUi>
      </CardActions>
    </Card>
  )
}
