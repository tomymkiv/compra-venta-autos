import { type PageProps } from '@/types/automovil';
import Pagination from '@/components/pagination';

export default function index({ posts }: PageProps) {
    return <>
        {
            posts.data.map((post, i) => (
                <div key={i}>
                    <p>
                        {post.user.name} <br/>
                        url de la imagen: {post.main_image.url || 'Error al mostrar la imagen'}<br/>
                        {post.user.name} vende {post.car.car_model.car_brand.marca} {post.car.car_model.modelo} a ${post.precio}
                    </p>
                    <img src={`${post.main_image.url}`} alt="" />
                </div>
            ))
        }
        <Pagination links={posts.links} />
        TODOS LOS VEHICULOS
    </>;
}