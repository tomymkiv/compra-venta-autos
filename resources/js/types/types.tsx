import React from "react";
import { type User } from ".";


export interface Rol {
    id: number,
    name: string,
}

// sirve para input (text, number), select y textarea
export interface FormFieldsInterface {
    max?: number | undefined,
    type?: string,
    options?: Array<SelectOptions>,
    errorsText: string | undefined,
    value: string | number,
    placeholder?: string,
    titulo: string,
    onChangeEventInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onChangeEventSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    onChangeEventTextarea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

// para un solo archivo
export interface FormFieldFileProps {
    image: File | Images | undefined,
    errors: string | undefined,
    removeImage: (index: number) => void,
    handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

// para multiples archivos
export interface FormFieldFilesProps {
    editSection: boolean,
    newImg: File[],
    errors: string | undefined,
    removeNewImage: (index: number) => void,
    handleImages: (e: React.ChangeEvent<HTMLInputElement>) => void,
    removeExistingImages?: (index: number) => void,
    existingImages?: Images[],
}

export interface Permission {
    id: number,
    name: string,
}

interface SelectOptions {
    id: number,
    nombre: string | number,
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
export interface CarType {
    id: number,
    tipo: string,
}
// lo que recibo cuando creo un auto (array de las marcas pre-hechas)
export interface CreateProps {
    carBrands: CarBrand[],
    car_types: CarType[],
    currencies: Currency[],
    provincias: Provincia[],
}
// lo que recibo a la hora de editar un post
export interface EditProps {
    carBrands: CarBrand[],
    postData: Post,
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
    deleted_images?: number[] // 👈 lo necesito para eliminar las imagenes existentes a la hora de editar
}
export interface EditForm {
    marca: number;
    modelo: string;
    anio: number;
    kilometraje: number;
    precio: string;
    descripcion: string;
    tipo: number;
    provincia: string;
    municipio: string;
    moneda: number;
    images: File[];
    deleted_images: number[];
    main_image: File | Images | null;
};

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
    initialQuery?: string,
    hero?: React.ReactNode,
    roles?: Rol[],
}
export interface FilterProps {
    posts: Paginated<Post>, // están paginados los posts
    carBrands: CarBrand[],
    showPages?: boolean | false,
    carType: CarType[],
    provincias: Provincia[],
    municipios: Municipio[],
    currencies: Currency[],
}
export interface CarCardsProps {
    post: Post,
}
export interface ProfileProps {
    post?: Post[],
    children: React.ReactNode,
    profileUser: User,
}