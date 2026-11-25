import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mimikids.com.ar'

interface Article {
  slug: string
  title: string
  description: string
  keywords: string[]
  date: string
  readTime: string
  category: string
  content: React.ReactNode
}

const ARTICLES: Record<string, Article> = {
  'que-es-un-portachupete-personalizado': {
    slug: 'que-es-un-portachupete-personalizado',
    title: '¿Qué es un portachupete personalizado y cómo se hace?',
    description: 'Descubrí qué es un portachupete personalizado, cómo se fabrica de manera artesanal y por qué es el accesorio más especial para bebés en Argentina.',
    keywords: ['portachupete personalizado', 'cómo se hace un portachupete', 'portachupete artesanal', 'accesorios bebé personalizados'],
    date: '2026-07-15',
    readTime: '4 min',
    category: 'Productos',
    content: null,
  },
  'como-limpiar-portachupete-silicona': {
    slug: 'como-limpiar-portachupete-silicona',
    title: 'Cómo limpiar un portachupete de silicona correctamente',
    description: 'Aprende a limpiar y mantener el portachupete de tu bebé paso a paso. Consejos para cuidar las cuentas de silicona, las letras y el clip sin dañarlos.',
    keywords: ['cómo limpiar portachupete silicona', 'cuidado portachupete bebé', 'limpiar portachupete artesanal'],
    date: '2026-07-22',
    readTime: '3 min',
    category: 'Cuidados',
    content: null,
  },
  'regalo-baby-shower-portachupete': {
    slug: 'regalo-baby-shower-portachupete',
    title: 'El mejor regalo para un baby shower: portachupete personalizado',
    description: 'Por qué un portachupete personalizado con el nombre del bebé es el regalo más especial para un baby shower en Argentina. Ideas, consejos y precios.',
    keywords: ['regalo baby shower', 'portachupete baby shower', 'regalo bebé personalizado argentina', 'ideas regalo baby shower'],
    date: '2026-08-01',
    readTime: '4 min',
    category: 'Regalos',
    content: null,
  },
  'diferencia-letras-silicona-madera': {
    slug: 'diferencia-letras-silicona-madera',
    title: 'Letras de silicona vs. letras de madera en portachupetes: ¿cuál elegir?',
    description: 'Comparamos los dos estilos de letras para portachupetes personalizados: silicona y madera de haya. Diferencias de precio, estética y durabilidad.',
    keywords: ['letras silicona portachupete', 'letras madera portachupete', 'diferencia letras portachupete'],
    date: '2026-08-10',
    readTime: '3 min',
    category: 'Guía',
    content: null,
  },
  'portachupete-seguro-bebe': {
    slug: 'portachupete-seguro-bebe',
    title: '¿Es seguro un portachupete personalizado para bebés?',
    description: 'Todos los materiales que usamos en Mimikids son seguros y libres de BPA. Te explicamos qué certificaciones tienen y por qué son los indicados para tu bebé.',
    keywords: ['portachupete seguro bebé', 'portachupete silicona bpa free', 'materiales seguros bebé'],
    date: '2026-09-01',
    readTime: '5 min',
    category: 'Seguridad',
    content: null,
  },
  'regalo-navidad-bebe-portachupete-personalizado': {
    slug: 'regalo-navidad-bebe-portachupete-personalizado',
    title: 'El mejor regalo de Navidad para bebés: portachupete personalizado',
    description: 'Buscás el regalo de Navidad ideal para un bebé? Un portachupete personalizado con su nombre es único, artesanal y llega a tiempo. Pedilo antes del 20 de diciembre.',
    keywords: ['regalo navidad bebé', 'portachupete personalizado navidad', 'regalo navidad personalizado bebé argentina', 'ideas regalo navidad bebé', 'regalo original navidad bebé'],
    date: '2026-11-25',
    readTime: '4 min',
    category: 'Regalos',
    content: null,
  },
}

const ARTICLE_CONTENT: Record<string, () => React.ReactNode> = {
  'que-es-un-portachupete-personalizado': () => (
    <div className="prose-mimikids">
      <p>
        Un <strong>portachupete personalizado</strong> es un accesorio artesanal para bebés que combina
        cuentas de silicona grado alimentario con letras que forman el nombre del bebé, terminando en
        un clip o broche para sujetar el chupete. Cada uno se fabrica a mano, uno por uno, lo que lo
        convierte en un objeto único e irrepetible.
      </p>

      <h2>¿De qué está hecho un portachupete personalizado?</h2>
      <p>
        En Mimikids usamos materiales seleccionados por su seguridad y durabilidad:
      </p>
      <ul>
        <li><strong>Cuentas de silicona grado alimentario:</strong> libres de BPA, PVC y ftalatos. Las mismas que se usan en mordillos certificados.</li>
        <li><strong>Letras de silicona o madera de haya:</strong> disponibles en blanco, beige, rosa o celeste (silicona) o en madera natural de haya, una madera dura y sin astillas.</li>
        <li><strong>Hilo de nylon resistente:</strong> el hilo que enfilamos es grueso y trenzado, diseñado para aguantar el uso diario sin romperse.</li>
        <li><strong>Clip o broche:</strong> fabricado en madera de haya, sin pintura ni barniz. Seguro al contacto con la boca del bebé.</li>
      </ul>

      <h2>¿Cómo se fabrica un portachupete artesanal?</h2>
      <p>
        El proceso de fabricación de cada portachupete en Mimikids lleva entre 1 y 2 días hábiles
        y es completamente manual:
      </p>
      <ol>
        <li><strong>Selección de las cuentas:</strong> elegimos las cuentas de silicona según el color y diseño pedido.</li>
        <li><strong>Preparación de las letras:</strong> separamos las letras que forman el nombre del bebé, en el material elegido (silicona o madera).</li>
        <li><strong>Enfilado:</strong> ensartamos las cuentas y las letras en el hilo de nylon, intercalándolas según el diseño. Las letras van en el centro del portachupete.</li>
        <li><strong>Nudo y clip:</strong> hacemos un nudo especial que no se deshace con el uso y colocamos el clip de madera que sostendrá el chupete.</li>
        <li><strong>Control de calidad:</strong> revisamos el largo, la tensión del hilo y la correcta posición de las letras antes de empaquetar.</li>
        <li><strong>Packaging:</strong> cada portachupete se empaqueta individualmente, listo para regalar.</li>
      </ol>

      <h2>¿Para qué edad es el portachupete?</h2>
      <p>
        Los portachupetes están diseñados para bebés desde los primeros meses de vida hasta los 2-3 años,
        que es el período en que la mayoría de los bebés usan chupete. Los materiales son seguros para
        esta etapa evolutiva: las cuentas son lo suficientemente grandes para que no representen un riesgo
        y el hilo es resistente a tirones.
      </p>
      <p>
        El portachupete se sujeta a la ropa del bebé con el clip de madera, manteniéndolo cerca cuando
        el chupete cae sin que toque el suelo.
      </p>

      <h2>¿Qué diferencia tiene un portachupete artesanal del de fábrica?</h2>
      <p>
        La diferencia principal es la personalización y el proceso de fabricación. Los portachupetes
        industriales se producen en serie, siempre iguales. Un portachupete artesanal de Mimikids
        lleva el nombre específico de tu bebé, en el orden y estilo que vos elegís, con la combinación
        de colores que más te gusta.
      </p>
      <p>
        Además, al ser fabricado a mano, podemos ajustar el largo, agregar cuentas especiales o hacer
        combinaciones que no están en el catálogo estándar. Si tenés una idea especial, nos escribís
        por WhatsApp y lo hacemos realidad.
      </p>

      <h2>¿Dónde se fabrican los portachupetes de Mimikids?</h2>
      <p>
        Todos nuestros portachupetes se fabrican en <strong>Trenque Lauquen, provincia de Buenos Aires,
        Argentina</strong>. Somos un emprendimiento familiar y cada pieza pasa por nuestras manos antes
        de llegar a la tuya. Enviamos a todo el país por Andreani.
      </p>
    </div>
  ),

  'como-limpiar-portachupete-silicona': () => (
    <div className="prose-mimikids">
      <p>
        El portachupete de tu bebé se usa a diario y está en constante contacto con sus manos, su ropa
        y el ambiente. Mantenerlo limpio es sencillo si conocés el método correcto. Acá te explicamos
        cómo hacerlo sin dañar las cuentas de silicona, las letras ni el hilo.
      </p>

      <h2>¿Con qué frecuencia hay que limpiar el portachupete?</h2>
      <p>
        Lo ideal es limpiarlo <strong>una vez por semana</strong> de manera rutinaria, o inmediatamente
        cuando cae al suelo, se moja con leche o queda expuesto a suciedad visible.
      </p>

      <h2>Paso a paso: cómo limpiar un portachupete de silicona</h2>
      <ol>
        <li>
          <strong>Usá un paño húmedo o tela suave:</strong> humedecé un paño de algodón con agua tibia
          y pasalo por toda la superficie del portachupete, prestando atención a los espacios entre las
          cuentas.
        </li>
        <li>
          <strong>Jabón neutro si es necesario:</strong> si hay suciedad más adherida, podés usar una
          pequeña cantidad de jabón neutro (el mismo que usás para los biberones). Enjuagá bien con agua
          limpia después.
        </li>
        <li>
          <strong>Secado al aire:</strong> apoyalo sobre una toalla limpia y dejalo secar a temperatura
          ambiente. No lo pongas cerca de fuentes de calor directas.
        </li>
      </ol>

      <h2>¿Se puede hervir o esterilizar el portachupete?</h2>
      <p>
        <strong>No recomendamos hervir ni sumergir el portachupete en agua</strong>, especialmente si
        tiene letras de madera de haya. El agua caliente prolongada puede:
      </p>
      <ul>
        <li>Aflojar el hilo de nylon con el tiempo</li>
        <li>Cambiar la textura de las cuentas de silicona</li>
        <li>Dañar la madera si las letras son de haya</li>
      </ul>
      <p>
        Las cuentas de silicona grado alimentario son resistentes al calor moderado, pero no es necesario
        esterilizarlas para mantenerlas higiénicas. El portachupete no es el chupete en sí —
        este sí requiere esterilización regular — sino el accesorio que lo sostiene.
      </p>

      <h2>¿Qué no hay que hacer?</h2>
      <ul>
        <li><strong>No sumergir en agua:</strong> especialmente si tiene letras de madera</li>
        <li><strong>No usar lavandina ni desinfectantes agresivos:</strong> pueden decolorar las cuentas</li>
        <li><strong>No exponer al sol directo por períodos prolongados:</strong> puede desvanecer los colores de la silicona con el tiempo</li>
        <li><strong>No lavar en lavarropas ni lavavajillas:</strong> el movimiento brusco puede dañar el enfilado</li>
      </ul>

      <h2>¿Cuánto dura un portachupete artesanal con buen cuidado?</h2>
      <p>
        Con cuidado básico, un portachupete de Mimikids dura todo el tiempo que tu bebé use chupete
        (generalmente hasta los 2-3 años). Si notás que el hilo comienza a deshilacharse o que alguna
        cuenta se afloja, escribinos por WhatsApp — lo evaluamos y te contamos si tiene arreglo.
      </p>
    </div>
  ),

  'regalo-baby-shower-portachupete': () => (
    <div className="prose-mimikids">
      <p>
        Elegir el regalo perfecto para un baby shower puede ser todo un desafío: querés que sea útil,
        original y que sea algo que la mamá recuerde. Los <strong>portachupetes personalizados</strong>
        se convirtieron en uno de los regalos más buscados en Argentina, y no es casualidad.
      </p>

      <h2>¿Por qué un portachupete personalizado es el regalo ideal para baby shower?</h2>
      <p>
        Hay varios atributos que lo hacen destacar entre las opciones clásicas de baby shower:
      </p>
      <ul>
        <li><strong>Es personalizado:</strong> lleva el nombre del bebé, lo que lo convierte en algo único y con valor sentimental.</li>
        <li><strong>Es práctico:</strong> el portachupete es uno de los accesorios más usados en los primeros años de vida del bebé.</li>
        <li><strong>Es seguro:</strong> los materiales certificados libres de BPA dan tranquilidad a los papás.</li>
        <li><strong>Es artesanal:</strong> cada uno está hecho a mano, lo que le da un valor diferencial frente a un producto de fábrica.</li>
        <li><strong>Llega con packaging de regalo:</strong> no necesitás envolverlo, ya viene listo para regalar.</li>
      </ul>

      <h2>¿Qué pasa si no sé el nombre del bebé todavía?</h2>
      <p>
        Es una situación muy común en los baby showers que se hacen antes de que nazca el bebé. En ese
        caso tenés dos opciones:
      </p>
      <ol>
        <li><strong>Esperar al nombre:</strong> podés regalar una tarjeta o voucher indicando que el portachupete se pedirá una vez que nazca el bebé y se confirme el nombre.</li>
        <li><strong>Regalar una funda guardachupete:</strong> nuestra <Link href="/guardachupetes" className="text-[#C4687D] hover:underline">funda guardachupete artesanal</Link> no lleva nombre, así que es ideal si todavía no se sabe. Se puede comprar sola y después armar el combo portachupete + funda cuando llegue el bebé, con un 25% de descuento.</li>
      </ol>

      <h2>¿Qué modelo elegir para un regalo de baby shower?</h2>
      <p>
        Si no conocés el nombre del bebé, la funda es la opción segura. Si ya sabés el nombre, te
        recomendamos:
      </p>
      <ul>
        <li><strong>Letras de madera de haya:</strong> estilo natural y atemporal, funciona para cualquier paleta de colores del cuarto del bebé.</li>
        <li><strong>Letras de silicona blancas:</strong> clásicas y versátiles, combinan con todo.</li>
        <li><strong>Letras de silicona de colores:</strong> rosa para nenas, celeste para nenes, o beige para un estilo más neutro.</li>
      </ul>
      <p>
        Podés ver todos los modelos disponibles en nuestra <Link href="/modelos" className="text-[#C4687D] hover:underline">galería de modelos</Link> antes de decidirte.
      </p>

      <h2>¿Cuánto cuesta un portachupete para regalar?</h2>
      <p>
        El precio varía según el modelo. Actualmente todos los portachupetes tienen un <strong>20% de
        descuento</strong> y si se compra el combo portachupete + funda guardachupete el descuento es
        del 25% en todo. Los precios actualizados están en nuestra <Link href="/shop" className="text-[#C4687D] hover:underline">tienda online</Link>.
      </p>

      <h2>¿Cómo se pide y cuánto tarda?</h2>
      <p>
        El pedido se hace 100% online: elegís el modelo, ingresás el nombre del bebé, completás el
        checkout y realizás la transferencia bancaria. La producción artesanal toma 1 a 2 días hábiles
        y el envío es por Andreani a todo el país. Los tiempos de entrega varían según la localidad.
      </p>
      <p>
        Si necesitás el portachupete para una fecha específica (el día del baby shower, por ejemplo),
        escribinos por WhatsApp y coordinamos los tiempos.
      </p>
    </div>
  ),

  'diferencia-letras-silicona-madera': () => (
    <div className="prose-mimikids">
      <p>
        Una de las primeras decisiones al pedir un portachupete personalizado en Mimikids es el tipo
        de letras: <strong>silicona</strong> o <strong>madera de haya</strong>. Ambas opciones son
        seguras para bebés, pero tienen diferencias de estética, textura y mantenimiento que vale la
        pena conocer antes de elegir.
      </p>

      <h2>Letras de silicona: coloridas y modernas</h2>
      <p>
        Las letras de silicona son suaves al tacto, flexibles y vienen en cuatro colores: blanco, beige,
        rosa y celeste. Son la opción más popular entre nuestros clientes.
      </p>
      <ul>
        <li><strong>Estética:</strong> moderna y colorida. Combinan bien con portachupetes de cuentas de colores.</li>
        <li><strong>Textura:</strong> suave y flexible, igual que las cuentas del portachupete. Dan uniformidad visual al accesorio.</li>
        <li><strong>Colores disponibles:</strong> blanco, beige, rosa pastel, celeste.</li>
        <li><strong>Mantenimiento:</strong> se limpian igual que las cuentas, con un paño húmedo.</li>
        <li><strong>Durabilidad:</strong> muy resistentes al uso diario. No se astillan ni se rayan.</li>
      </ul>

      <h2>Letras de madera de haya: natural y atemporal</h2>
      <p>
        Las letras de madera de haya natural tienen un estilo más rústico y orgánico. Son perfectas
        para mamás que buscan un estilo neutro o scandi.
      </p>
      <ul>
        <li><strong>Estética:</strong> natural, cálida y atemporal. Funciona con cualquier paleta de colores.</li>
        <li><strong>Textura:</strong> más rígida que la silicona, con la calidez característica de la madera.</li>
        <li><strong>Mantenimiento:</strong> requieren un poco más de cuidado — no deben sumergirse en agua ni hervirse, solo limpieza con paño húmedo.</li>
        <li><strong>Durabilidad:</strong> la madera de haya es dura y resistente, pero puede mancharse con humedad excesiva.</li>
      </ul>

      <h2>¿Cuál elegir?</h2>
      <p>
        La elección depende principalmente del estilo que busques:
      </p>
      <ul>
        <li>Si querés un portachupete <strong>colorido y moderno</strong>, elegí letras de silicona.</li>
        <li>Si buscás un estilo <strong>natural y versátil</strong> que combine con todo, las letras de madera son la mejor opción.</li>
        <li>Si es un <strong>regalo y no sabés el gusto</strong> de la mamá, las letras de madera son la opción más segura por su carácter neutro.</li>
      </ul>
      <p>
        Podés ver cómo queda cada estilo en nuestra{' '}
        <Link href="/modelos" className="text-[#C4687D] hover:underline">galería de modelos</Link>{' '}
        antes de decidirte.
      </p>
    </div>
  ),

  'portachupete-seguro-bebe': () => (
    <div className="prose-mimikids">
      <p>
        La seguridad de los materiales es la primera pregunta que nos hacen los papás, y con razón.
        Un portachupete está en contacto constante con el bebé: sus manos lo tocan, puede llevárselo
        a la boca, y el clip roza su ropa. Por eso en Mimikids seleccionamos cada material con criterio.
      </p>

      <h2>¿Los materiales son libres de BPA?</h2>
      <p>
        Sí. Todas las cuentas de silicona que usamos son <strong>grado alimentario, libres de BPA, PVC
        y ftalatos</strong>. Son los mismos materiales certificados que se usan en mordillos y accesorios
        de lactancia aprobados para bebés.
      </p>
      <p>
        El BPA (Bisfenol A) es un compuesto químico que se encontraba en plásticos rígidos y que puede
        afectar el sistema hormonal. Los materiales grado alimentario están certificados como seguros
        para el contacto con alimentos y con la boca de bebés.
      </p>

      <h2>¿Qué es la silicona grado alimentario?</h2>
      <p>
        La silicona grado alimentario es un polímero que supera las pruebas de seguridad para estar en
        contacto con alimentos y con bebés. Se usa en chupetes, biberones, mordillos y utensilios de
        cocina. No libera químicos, no absorbe bacterias y es fácil de limpiar.
      </p>

      <h2>¿La madera de haya es segura?</h2>
      <p>
        La madera de haya natural que usamos para letras y clip es <strong>sin pintura ni barniz</strong>.
        Es una madera dura, sin astillas, con una superficie lisa y natural. Se usa habitualmente en
        juguetes infantiles certificados en Europa (norma EN 71).
      </p>
      <p>
        Al no tener ningún tratamiento superficial, no hay riesgo de que el bebé ingiera químicos si
        se lleva el portachupete a la boca.
      </p>

      <h2>¿El hilo de nylon es seguro?</h2>
      <p>
        El hilo que usamos es nylon trenzado, el mismo que se usa en bisutería y accesorios infantiles.
        Es resistente, no se corta fácilmente y no libera ningún componente tóxico. Revisamos la tensión
        del hilo en cada portachupete antes de enviarlo.
      </p>

      <h2>¿El portachupete puede entrar a la boca del bebé?</h2>
      <p>
        El portachupete <strong>no está diseñado para ser masticado</strong>: es un accesorio que sujeta
        el chupete a la ropa del bebé. Las cuentas son lo suficientemente grandes para no representar un
        riesgo de asfixia, pero como todo accesorio de bebé, debe usarse con supervisión adulta y no
        dejarse sin vigilancia.
      </p>
      <p>
        La longitud estándar del portachupete (alrededor de 22 cm) está pensada para que el chupete
        quede cerca del bebé sin llegar a envolvérsele en el cuello.
      </p>

      <h2>¿Qué dice la normativa sobre portachupetes?</h2>
      <p>
        En Argentina no existe una norma IRAM específica para portachupetes artesanales, pero los
        materiales que usamos cumplen con los estándares internacionales para accesorios de bebés
        (libre de BPA, madera certificada, dimensiones seguras). Si tenés alguna duda puntual sobre
        los materiales, escribinos por WhatsApp y te respondemos con detalle.
      </p>
    </div>
  ),

  'regalo-navidad-bebe-portachupete-personalizado': () => (
    <div className="prose-mimikids">
      <p>
        Llega Navidad y la pregunta es siempre la misma: <em>¿qué le regalo a un bebé?</em> Los juguetes
        genéricos abundan, pero pocas cosas se quedan en el corazón de una familia como un objeto hecho
        especialmente para su hijo. Un <strong>portachupete personalizado con el nombre del bebé</strong> es
        exactamente eso: un regalo artesanal, único y de uso diario.
      </p>

      <h2>¿Por qué un portachupete personalizado es el mejor regalo de Navidad para bebés?</h2>
      <p>
        A diferencia de la ropa (que queda chica) o los juguetes (que se olvidan), un portachupete
        personalizado tiene tres cualidades que lo hacen especial:
      </p>
      <ul>
        <li><strong>Es único:</strong> tiene el nombre del bebé, nadie más en el mundo tiene uno igual.</li>
        <li><strong>Es útil:</strong> se usa todos los días desde que llega a casa hasta que el bebé deja el chupete.</li>
        <li><strong>Es artesanal:</strong> cada uno se hace a mano en Argentina, con materiales seguros y libres de BPA.</li>
      </ul>

      <h2>¿Qué edades son las ideales para regalarlo?</h2>
      <p>
        El portachupete es el regalo perfecto para bebés de <strong>0 a 2 años</strong>, que son las edades
        en que el chupete es parte de la rutina diaria. También es el regalo más buscado para baby showers,
        nacimientos y primeros cumpleaños.
      </p>
      <p>
        Para bebés más grandes que ya no usan chupete, el{' '}
        <Link href="/shop" className="text-[#C4687D] hover:underline">llavero personalizado</Link>{' '}
        con nombre es otra opción preciosa.
      </p>

      <h2>¿Llega a tiempo para Navidad?</h2>
      <p>
        Esta es la pregunta clave. En Mimikids fabricamos cada portachupete en <strong>1 a 2 días hábiles</strong>{' '}
        desde que confirmamos tu pedido. Para que llegue para el 25 de diciembre, recomendamos pedirlo
        antes del <strong>20 de diciembre</strong>.
      </p>
      <p>
        El envío se hace por Andreani a todo el país (2 a 4 días hábiles). Si estás cerca de Trenque Lauquen,
        Buenos Aires, también podés pasar a buscarlo sin costo de envío.
      </p>

      <h2>¿Cómo personalizo el portachupete?</h2>
      <p>
        El proceso es muy simple:
      </p>
      <ul>
        <li>Elegís el modelo y los colores en nuestra <Link href="/shop" className="text-[#C4687D] hover:underline">tienda online</Link>.</li>
        <li>Escribís el nombre del bebé al personalizar.</li>
        <li>Elegís el tipo de letras (silicona de colores o madera natural).</li>
        <li>Pagás con tarjeta, transferencia o MercadoPago y listo.</li>
      </ul>
      <p>
        En 24 a 48 horas ya está en camino a tu casa.
      </p>

      <h2>Ideas de regalo navideño con portachupete</h2>
      <p>
        Si querés armar un regalo más completo, podés combinar el portachupete con otros productos de Mimikids:
      </p>
      <ul>
        <li><strong>Portachupete + llavero:</strong> el llavero con el nombre del bebé queda perfecto junto al portachupete. Muchos papás lo usan para las llaves de la casa y el auto.</li>
        <li><strong>Portachupete + funda de chupete:</strong> protege el chupete cuando no está en uso. Un combo completo y práctico.</li>
        <li><strong>Pack regalo:</strong> pedinos por WhatsApp si querés packaging especial para regalo.</li>
      </ul>

      <h2>¿Cuánto cuesta un portachupete personalizado?</h2>
      <p>
        Los portachupetes personalizados de Mimikids tienen un precio accesible para ser un producto artesanal
        y hecho a mano. Podés ver los precios actualizados en nuestra{' '}
        <Link href="/shop" className="text-[#C4687D] hover:underline">tienda online</Link>.
        Actualmente hay un descuento especial de Navidad disponible.
      </p>

      <h2>¿Es seguro para bebés?</h2>
      <p>
        Todos los materiales son <strong>libres de BPA, PVC y ftalatos</strong>. Las cuentas de silicona
        son grado alimentario, las letras de madera son de haya natural certificada, y el hilo es nylon
        resistente. Podés leer más sobre los materiales en nuestro artículo{' '}
        <Link href="/blog/portachupete-seguro-bebe" className="text-[#C4687D] hover:underline">
          ¿Es seguro un portachupete personalizado para bebés?
        </Link>
      </p>

      <div style={{ background: '#FFF0F3', borderRadius: 16, padding: '1.25rem 1.5rem', margin: '2rem 0', borderLeft: '4px solid #C4687D' }}>
        <p style={{ margin: 0, fontWeight: 700, color: '#2B1A20' }}>🎄 Oferta especial de Navidad</p>
        <p style={{ margin: '0.5rem 0 0', color: '#6D4D5A' }}>
          Usá el código <strong>NAVIDAD15</strong> en el carrito y llevate un 15% de descuento en tu pedido.
          Válido hasta el 25 de diciembre.
        </p>
      </div>
    </div>
  ),
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) return {}

  return {
    title: { absolute: `${article.title} | Blog Mimikids` },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: 'article',
      publishedTime: article.date,
      images: [{ url: `${SITE_URL}/mimikids.jpg`, width: 1080, height: 1080, alt: article.title }],
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) notFound()

  const contentFn = ARTICLE_CONTENT[slug]
  if (!contentFn) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'Mimikids', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Mimikids',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/mimikids.jpg` },
    },
    image: `${SITE_URL}/mimikids.jpg`,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[#FFFAF7]">

        {/* Header */}
        <div className="bg-gradient-to-b from-[#F6EEE9] to-[#FFFAF7] border-b border-[#EDCCD5]/40 pt-14 pb-10">
          <div className="max-w-2xl mx-auto px-5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A58494] mb-6">
              <Link href="/" className="hover:text-[#C4687D] transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#C4687D] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#6D4D5A] font-medium truncate">{article.category}</span>
            </nav>
            <span className="inline-block text-[0.625rem] font-black text-[#C4687D] bg-[#FAE8EC] px-2.5 py-1 rounded-full uppercase tracking-wide mb-4">
              {article.category}
            </span>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#2B1A20] leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-[#6D4D5A] leading-relaxed mb-5">{article.description}</p>
            <div className="flex items-center gap-4 text-xs text-[#A58494]">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {new Date(article.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readTime} de lectura
              </span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="max-w-2xl mx-auto px-5 py-12">
          <article className="text-[#4A3040] leading-relaxed">
            {contentFn()}
          </article>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-[#EDCCD5]/40">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#C4687D] hover:text-[#A8546A] transition-colors font-medium"
            >
              <ArrowLeft size={14} />
              Volver al blog
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-[#EDCCD5]/30 bg-[#F6EEE9]/50 py-12 text-center">
          <h2 className="font-playfair text-xl font-bold text-[#2B1A20] mb-3">
            ¿Buscás portachupetes personalizados?
          </h2>
          <p className="text-sm text-[#6D4D5A] mb-6">
            Visitá nuestra tienda y personalizá el tuyo con el nombre de tu bebé.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#C4687D] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#A8546A] transition-colors"
          >
            Ver portachupetes <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      <style>{`
        .prose-mimikids p { margin-bottom: 1rem; }
        .prose-mimikids h2 { font-family: var(--font-playfair), serif; font-size: 1.375rem; font-weight: 700; color: #2B1A20; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-mimikids ul, .prose-mimikids ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-mimikids li { margin-bottom: 0.5rem; }
        .prose-mimikids ul { list-style-type: disc; }
        .prose-mimikids ol { list-style-type: decimal; }
        .prose-mimikids strong { color: #2B1A20; font-weight: 600; }
      `}</style>
    </>
  )
}
