import { type CarProp } from '@/types/automovil';

export default function show({ post }: CarProp) {
    return <>
        <h2 className='text-2xl font-bold'>vehiculo especifico</h2>
        {
            <div>
                <h2>listado de imagenes del post de {post.user.name}</h2><br />
                {
                    post.post_image.map((img, i) => (
                        <div key={i} className='max-w-[400px]'>
                            <br />
                            <img src={`/storage/${img.url}`} alt="" />
                        </div>
                    ))
                }
                auto: {post.car.car_model.car_brand.marca} {post['car']['car_model'].modelo} {post.car.anio} <br />
                precio: ${post.precio} <br />
                descripcion: {post.descripcion} <br />
            </div>
        }
    </>;
}