import React from "react";
import { type User } from ".";

export interface Images{
    id: number,
    url: string,
    orden: number,
}
export interface CarBrand{
    id: number,
    marca: string,
}
// lo que recibo cuando creo un auto (array de las marcas pre-hechas)
export interface CreateProps{
    carBrands: CarBrand[],
    loguedUser: User,
}
// lo que recibo a la hora de editar un post
export interface EditProps{
    carBrands: CarBrand[],
    postData: Post,
    loguedUser: User,
}
export interface Post{
    id: number,
    fecha_publicacion: string,
    precio: number,
    descripcion: string,
    ubicacion: string,
    estado: string,
    user: User,
    post_image: Images[], // todas las imagenes
    main_image: Images, // solo una imagen (orden = 1)
    car:{
        kilometraje: number,
        anio: number,
        tipo: string,
        car_model:{
            modelo: string,
            car_brand: CarBrand
        } // al hacer todo en cascada, estoy relacionando cada tipo correctamente, siguiendo el hilo de lo que recibo en el backend con las relaciones entre FK.
    }
}

export interface CreatePostForm {
    marca: number | ''
    modelo: string
    anio: number | ''
    kilometraje: number | ''
    precio: number | ''
    descripcion: string
    tipo: string
    ubicacion: string
    images: File[]
}

// para varios autos
export interface PageProps{
    posts: Paginated<Post>, // están paginados los posts
    // users: User[],
    loguedUser: User,
}
// para un solo auto
export interface CarProp{
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

export interface AppComponentProps{
    children?: React.ReactNode,
    loguedUser?: User,
}
export interface FiltroProps{
    posts: Paginated<Post>,
    loguedUser: User
}
export interface CarCardsProps{
    loguedUser?: User,
    post: Post,
    src?: string,
}