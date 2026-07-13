const steps = [
  {
    number: '01',
    title: 'Elegí tu portachupete',
    description:
      'Navegá nuestra tienda y encontrá el modelo que más te guste. Cada uno tiene su propio color de letras y estilo.',
  },
  {
    number: '02',
    title: 'Personalizalo',
    description:
      'Elegí el broche, escribí el nombre de tu bebé y coordinamos el diseño completo por WhatsApp.',
  },
  {
    number: '03',
    title: 'Lo hacemos y enviamos',
    description:
      'En 3 a 5 días hábiles producimos tu pedido artesanalmente y lo enviamos a todo el país.',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#EDCCD5] via-[#E2D3F2] to-[#BDE8D6]"
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
