'use client'
import { AnimatedOnScroll } from '@/components/AnimetedOnScroll'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <section
      className="h-2/5 pb-10
     pt-10 min-h-fit border-t-[1px] text-white border-y-zinc-800 bg-blue-950"
    >
      <div className="block max-w-screen-lg m-auto max-sm justify-between sm:flex flex-row p-4">
        <Image alt="People working in group" src="/footer.svg" width={200} height={200} className="hidden md:flex" />
        <div className="flex flex-col">
          <h3 className="font-bold font-sans text-xl mb-6">Impactando a vida de milhares de pessoas</h3>
          <h4 className="font-sans">Repetir 2023</h4>
          <h4 className="font-sans">Todos os direitos reservados</h4>
          <AnimatedOnScroll id="social-media-container" hiddenX={-5} hiddenY={0}>
            <div className="flex flex-row w-2/3 pt-5 justify-between">
              <Facebook size="25" />
              <Instagram size="25" />
              <Twitter size="25" />
              <Linkedin size="25" />
              <Youtube size="25" />
            </div>
          </AnimatedOnScroll>
        </div>

        <div className="hidden lg:flex flex-col">
          <h3 className="font-sans font-bold text-xl pb-6">Sobre</h3>
          <Link href="/">Página Inicial</Link>
          <Link href="/privacy">Termo de Uso</Link>
          <Link href="/about">Sobre</Link>
          <Link href="/privacy">Política de Privacidade</Link>
          <Link href="/privacy">Direitos Autorais</Link>
        </div>

        <div className="hidden lg:flex flex-col">
          <h3 className="font-sans font-bold text-xl pb-6">Dúvidas</h3>
          <Link href="/help">Comunidade</Link>
          <Link href="/help">Central de Ajuda</Link>
        </div>
      </div>
    </section>
  )
}
