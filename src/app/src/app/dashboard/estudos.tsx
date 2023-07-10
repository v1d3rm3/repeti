import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import './hide-scrollbar.css'

import useDrag from './useDrag'
import Link from 'next/link'
import { Typography } from '@mui/material'

interface Estudo {
  id: string
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
  const [getEstudos, setEstudos] = useState<Estudo[]>([])

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
    fetch('http://localhost:3000/estudo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      cache: 'no-cache',
    }).then(res => {
      res.json().then(data => {
        setEstudos(
          data.body.map((e: any) => {
            return { ...e, itemId: e.id.toString(), id: e.id.toString() }
          }),
        )
      })
    })
    // setLoading(true)
    // const fetchStudies = async () => {
    //   const res = await fetch(`/api/study`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + token,
    //     },
    //     cache: 'no-cache',
    //   })

    //   const data = await res.json()

    //   setStudies(data.body)
    //   setLoading(false)
    // }

    // fetchStudies()
  }, [])

  return (
    <div className={`bg-gray-100 rounded ${className}`}>
      <ScrollMenu
        // LeftArrow={LeftArrow}
        // RightArrow={RightArrow}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        itemClassName="p-3 cursor-grab"
      >
        {getEstudos.map((estudo: Estudo, index) => {
          return (
            <div key={estudo.id}>
              <EstudoDetalhesCard categoria={estudo.categoria?.nome} />
            </div>
          )
        })}

        <BotaoMaisEstudos />
      </ScrollMenu>
    </div>
  )
}

function MaisEstudos() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <p>Para ver mais estudos</p>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          something
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Ver mais estudos</Button>
      </CardActions>
    </Card>
  )
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  )
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext)

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  )
}

function Arrow({ onClick, disabled, children }: { onClick: any; disabled: boolean; children: any }) {
  return <button onClick={onClick}>Arrow</button>
}

function BotaoMaisEstudos() {
  return (
    <Link className="text-lg inline-block p-3 w-52 text-center underline" href={'/alguma-coisa'}>
      Ver mais estudos
    </Link>
  )
}

function EstudoDetalhesCard({ categoria } : { categoria: string}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {categoria}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
