import React from "react";
import { type User } from ".";


export interface Rol {
    id: number,
    name: string,
    guard_name: string,
}

export interface Permission {
    id: number,
    name: string,
}

export interface Images {
    id: number,
    url: string,
    orden: number,
}
export interface Provincia {
    id: number,
    nombre: string,
}
export interface Municipio {
    id: number,
    id_provincia: number,
    nombre: string,
}
export interface CarBrand {
    id: number,
    marca: string,
}
interface CarType {
    id: number,
    tipo: string,
}
// lo que recibo cuando creo un auto (array de las marcas pre-hechas)
export interface CreateProps {
    carBrands: CarBrand[],
    loguedUser: User,
    car_types: CarType[],
    currencies: Currency[],
    provincias: Provincia[],
}
// lo que recibo a la hora de editar un post
export interface EditProps {
    carBrands: CarBrand[],
    postData: Post,
    loguedUser: User,
    car_types: CarType[],
    currencies: Currency[],
    provincias: Provincia[],
    permissions: Permission[],
}
export interface Currency {
    id: number,
    nombre: string,
}
export interface Post {
    id: number,
    fecha_publicacion: string,
    precio: number,
    descripcion: string,
    id_currency: number,
    currency: Currency,
    user: User,
    post_image: Images[], // todas las imagenes
    main_image: Images, // solo una imagen (orden = 1)
    car: {
        id_type: number,
        car_type: CarType,
        kilometraje: number,
        anio: number,
        car_model: {
            modelo: string,
            car_brand: CarBrand
        } // al hacer todo en cascada, estoy relacionando cada tipo correctamente, siguiendo el hilo de lo que recibo en el backend con las relaciones entre FK.
    },
    municipio: {
        id: number,
        nombre: string,
        provincia: Provincia
    },
}

export interface CreatePostForm {
    marca: number | ''
    modelo: string
    anio: number | ''
    kilometraje: number | ''
    precio: number | ''
    descripcion: string
    tipo: string
    provincia: string
    municipio: string
    images: File[]
    moneda: string
    main_image: File | ''
}

// para varios autos
export interface PageProps {
    posts: Paginated<Post>, // están paginados los posts
    loguedUser: User,
    showPages?: boolean | false,
}
// para un solo auto
export interface CarProp {
    post: Post,
    user: User,
}
export interface PaginationLink {
    url: string | null,
    label: string,
    active: boolean,
}

export interface Paginated<T> {
    data: T[], // informacion de <Product> (la 'T' es un parámetro de tipo, por lo que puede traer data de tipo Product, User o el tipo que sea)
    links: PaginationLink[], // información referida a los links (un array de la interfaz PaginationLink)
}

export interface AppComponentProps {
    children?: React.ReactNode,
    loguedUser?: User,
    initialQuery?: string,
}
export interface FilterProps {
    posts: Paginated<Post>, // están paginados los posts
    loguedUser: User,
    carBrands: CarBrand[],
    showPages?: boolean | false,
    carType: CarType[],
    provincias: Provincia[],
    municipios: Municipio[],
    currencies: Currency[],
    roles: Rol[],
}
export interface CarCardsProps {
    post: Post,
}
export interface ProfileProps {
    loguedUser: User,
    post?: Post[],
    children: React.ReactNode,
    user: User,
}