const steps = [
  {
    number: '01',
    title: 'Explorá los modelos',
    description:
      'Visitá nuestra galería de modelos reales y elegí el que más te gusta como referencia para el tuyo.',
  },
  {
    number: '02',
    title: 'Elegí tu portachupete',
    description:
      'Navegá la tienda, elegí el estilo y el broche, y escribí el nombre de tu bebé.',
  },
  {
    number: '03',
    title: 'Coordinamos por WhatsApp',
    description:
      'Te contactamos para confirmar colores, cuentas y detalles del diseño antes de producirlo.',
  },
  {
    number: '04',
    title: 'Lo hacemos y enviamos',
    description:
      'En 1 a 2 días hábiles producimos tu pedido artesanalmente y lo enviamos a todo el país.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-[#FFFAF7] py-24">
      <div className="max-w-6xl mx-auto px-5">

        <div className="text-center mb-16">
          <p className="label-caps mb-4">Simple y rápido</p>
          <h2 className="font-playfair text-[2rem] md:text-[2.5rem] font-bold text-[#2B1A20] leading-[1.15]">
            ¿Cómo funciona?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-[#EDCCD5] via-[#E2D3F2] to-[#BDE8D6]"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center px-6 pb-10 md:pb-0">
              {/* Number circle */}
              <div className="relative z-10 w-[6.5rem] h-[6.5rem] rounded-full bg-white border-2 border-[#EDCCD5] flex flex-col items-center justify-center mb-6 shadow-[0_4px_20px_rgba(43,26,32,0.07)]">
                <span className="font-playfair text-3xl font-bold text-[#C4687D] leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="font-playfair font-bold text-[#2B1A20] text-lg mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-[#6D4D5A] leading-relaxed max-w-[240px]">
                {step.description}
              </p>

              {/* Mobile step connector */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden w-px h-8 bg-[#EDCCD5] mt-4"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
