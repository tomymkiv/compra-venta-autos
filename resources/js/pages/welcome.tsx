import AppFront from '@/AppFront';
import Filtro from '@/components/Filtro';
import Presentaciones from '@/components/Presentaciones';
import { PageProps } from '@/types/automovil';

export default function Welcome({ loguedUser, posts }: PageProps) {
    return (
        <AppFront loguedUser={loguedUser}>
            <section className='flex flex-col gap-25 mt-20'>
                <div className="space-y-5 md:space-y-10">
                    <h1 className='text-4xl text-left animate-text-pulse md:text-5xl lg:text-6xl text-[#ccc] font-[200]'>Silvetti Automotores</h1>
                    <p>Somos un grupo de vendedores independientes dedicados a la compra, venta y permuta de vehículos, unidos por la transparencia y el trato directo.</p>
                </div>
                <hr className="m-0 animate-box-pulse" />
                <div className="space-y-50">
                    <Presentaciones titulo="Sobre nosotros" descripcion="Trabajamos de forma autónoma, pero compartimos un mismo objetivo: que cada compra y venta sea clara y segura. Cada vehículo es ofrecido con información real y atención personalizada." img="https://imgs.search.brave.com/Mrkc3fRnJ-3YlH1rYjLT-DiqKt_LyAzgYyfDyea0ShY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy8yMDIz/LWF1ZGktcjgtZ3Qt/cmVhci10aHJlZS1x/dWFydGVycy1tb3Rp/b24tMTY2NDgyNzk4/My5qcGc_Y3JvcD0w/Ljc4Mnh3OjAuNzE3/eGg7MC4xNTB4dyww/LjE4NHhoJnJlc2l6/ZT05ODA6Kg" />
                    <Presentaciones titulo="¿Por qué elegirnos?" descripcion="Porque creemos en el trato directo, sin intermediarios innecesarios. Ofrecemos autos seleccionados, información real y un acompañamiento cercano en cada paso." img="https://imgs.search.brave.com/Mrkc3fRnJ-3YlH1rYjLT-DiqKt_LyAzgYyfDyea0ShY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy8yMDIz/LWF1ZGktcjgtZ3Qt/cmVhci10aHJlZS1x/dWFydGVycy1tb3Rp/b24tMTY2NDgyNzk4/My5qcGc_Y3JvcD0w/Ljc4Mnh3OjAuNzE3/eGg7MC4xNTB4dyww/LjE4NHhoJnJlc2l6/ZT05ODA6Kg" clases="lg:-order-1" />
                </div> 
                <hr className="m-0 animate-box-pulse" />
                <section id='categorias' className='flex flex-col items-center justify-center'>
                    <div className='space-y-4'>
                        <div>
                            <Filtro posts={posts} loguedUser={loguedUser} />
                        </div>
                    </div>
                </section>
            </section>
        </AppFront>
    );
}
