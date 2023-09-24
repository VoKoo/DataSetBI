import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DataSet',
  description: 'Información sobre proveedores de telecomunicaciones',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className='w-[80%] px-[20px] mx-auto mt-10 pb-2 text-center border-b-2 border-white text-xl font-bold'>
          Tráfico de diferentes proveedores de tecnología en el país
        </div>
        <div className="contenedor">
          {children}
        </div>
      </body>
    </html>
  )
}
