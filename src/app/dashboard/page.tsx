'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '../context/UserContext'
import { useEffect } from 'react'

const temas = ['Historia', 'Biologia', 'Matematicas', 'Geografia']

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
    if (user?.rol === 'PROFESOR') {
      router.push('/resultados')
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.rol !== 'ESTUDIANTE') {
    return <p className="text-center mt-10">Cargando...</p>
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Panel del Estudiante</h1>

        <p className="text-gray-700 mb-6">
          Bienvenido a tu panel de estudiante.
        </p>

        <Link
          className="inline-block mb-6 text-sm text-blue-700 font-medium hover:underline"
          href={`/resultados/alumnos/${user.id}`}
        >
          Ver resultados anteriores
        </Link>

        <p className="text-xl font-semibold text-blue-800 mb-4">
          Selecciona un tema para comenzar el cuestionario:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {temas.map((tema) => (
            <Link
              key={tema}
              href={`/quiz/${tema.toLowerCase()}`}
              className="block bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold shadow-md transition"
            >
              {tema}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
