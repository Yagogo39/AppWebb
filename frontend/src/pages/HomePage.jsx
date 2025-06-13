import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.webp'
import mapa from '../assets/mapa.jpg'
import robot from '../assets/robot.webp'

const Temporizador = () => {
  const targetDate = new Date(2025, 8, 18, 8, 0, 0) 
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference <= 0)
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeRemaining(calculateTimeRemaining())
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <h2 translate='no' className='text-3xl font-bold'>Faltan</h2>
      <div className="flex justify-center items-center py-3 bg-white transition-all duration-500">

        <div className="flex items-center gap-4 px-6 py-6 bg-[#f5f5f5] rounded-xl shadow-xl">
          <TimeBlock value={timeRemaining.days} label="DÍAS" />
          <TimeBlock value={timeRemaining.hours.toString().padStart(2, '0')} label="HORAS" />
          <TimeBlock value={timeRemaining.minutes.toString().padStart(2, '0')} label="MIN" />
          <TimeBlock value={timeRemaining.seconds.toString().padStart(2, '0')} label="SEG" />
        </div>
      </div>
    </>
  )
}

const TimeBlock = ({ value, label }) => (
  <div className="text-center">
    <div className="px-4 py-3 bg-[#6B9071] rounded-xl text-white text-3xl font-bold shadow-md">
      {value}
    </div>
    <div className="text-xs text-gray-600 mt-1 tracking-wide">{label}</div>
  </div>
)

export default function HomePage() {

  const palabras = ['Desafiante', 'Epico', 'Extremo', 'Divertido', 'Increible']
  const [palabra, setPalabra] = useState('Desafiante');
  useEffect(() => {
    const intervaloTiempo = setInterval(() => {
      const aleatoria = palabras[Math.floor(Math.random() * palabras.length)]
      setPalabra(aleatoria)
    }, 500)
    return () => clearInterval(intervaloTiempo)
  }, [])

  const [participantes, setParticipantes] = useState(128)
  useEffect(() => {
    const intervaloTiempo2 = setInterval(() => {
      setParticipantes(prev => prev + Math.floor(Math.random() * 3))
    }, 1000)
    return () => clearInterval(intervaloTiempo2)
  }, [])

  return (
    <div className="">
      <div className='bg-[#A4C3A2]'>
        <header className="h-40  flex shadow-lg px-6">
          <div className="flex items-center gap-4">
            <img src={logo} className="h-14 rounded-lg object-cover -p-3" alt="Logo" />
            <h1 translate='no' className="text-white text-3xl font-serif font-bold animate-bounce drop-shadow-lg">
              RunApp
            </h1>
          </div>
        </header>

        <div className="bg-[#d4e0cc] py-24 px-5 text-center relative">
          <img src={robot} className='absolute -top-43 -right-7 w-[300px] h-[300px] z-10'></img>
          <h2 className="font-bold m-0 text-[4rem] text-[#38403b] ">{palabra}</h2>
          <p translate='no' className="text-[1.2rem] text-[#4a564b]">¿Estás listo?</p>
        </div>
      </div>

      <section className="py-20 px-5 text-center bg-white">
        <Temporizador />
        <h3 className="text-[2rem] mb-8 font-semibold text-[#3c4d3f]">¿Te atreves?</h3>
        <div className="flex justify-center flex-wrap gap-8 my-10">
          <div translate='no' className="w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-white font-bold bg-[#a2b99c] hover:scale-105 transition-transform duration-300 shadow-lg text-4xl ">
            5.8 km
          </div>

          <div className="w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-white font-bold bg-[#a69aac] hover:scale-105 transition-transform duration-300 shadow-lg">
            <img className='w-[150px] h-[150px] rounded-full' src={mapa} />
          </div>
          <div className="w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-white font-bold bg-[#c8b9a6] hover:scale-105 transition-transform duration-300 shadow-lg text-3xl">
            ¿Podras?
          </div>
        </div>

        <h4 className='font-light text-2xl'>Personas inscritas: {participantes}</h4>
      </section>
      <div className="snap-x snap-mandatory flex overflow-x-auto w-full h-50">
        <div className="snap-center w-full h-30 flex-shrink-0 flex items-center justify-center bg-blue-100 p-4">
          <p className="font-bold text-2xl animate-pulse text-gray-600 items-center justify-center">Corre como si hubieras robado algo</p>
        </div>

        <div className="snap-center w-full h-30 flex-shrink-0 flex items-center justify-center bg-red-100 p-4">
          <p className="font-bold text-2xl animate-pulse text-gray-600">No sueñes con el exito, trabaja para lograrlo.</p>
        </div>

        <div className="snap-center w-full h-30 flex-shrink-0 flex items-center justify-center bg-green-100 p-4">
          <p className="font-bold text-2xl animate-pulse text-gray-600">Siempre parece imposible hasta que se hace.</p>
        </div>

        <div className="snap-center w-full h-30 flex-shrink-0 flex items-center justify-center bg-yellow-100 p-4">
          <p className="font-bold text-2xl animate-pulse text-gray-600">Todo esfuerzo es inutil, sino crees en ti mismo.</p>
        </div>
      </div>
    </div>
  )
}