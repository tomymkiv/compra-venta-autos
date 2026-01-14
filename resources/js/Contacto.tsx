import AppFront from './AppFront';
import Titulo from "./components/Titulo";

function Contacto() {
    return <AppFront>
        <div>
            <section id="contacto" className="flex flex-col items-center justify-center mt-20">
                <div>
                    <Titulo titulo="Contacto" />
                </div>
                <div className="">
                    <form action="" className="space-y-8 md:min-w-xl">
                        <div>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" className="w-full outline outline-gray-200 rounded-sm p-2 focus:bg-[#222] transition-colors duration-300 mt-2.5" placeholder="Ej: Juan Méndez" />
                        </div>
                        <div>
                            <label htmlFor="correo" className="mt-5">Correo:</label>
                            <input type="text" id="correo" name="correo" className="w-full outline outline-gray-200 rounded-sm p-2 focus:bg-[#222] transition-colors duration-300 mt-2.5" placeholder="tito@example.com" />
                        </div>
                        <div>
                            <label htmlFor="mensaje" className="mt-5">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" className="w-full outline outline-gray-200 rounded-sm p-2 focus:bg-[#222] transition-colors duration-300 mt-2.5" placeholder="Ej: Hola. Quiero comunicarme con ustedes."></textarea>
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full p-3 text-lg font-[500] bg-gray-800 rounded-lg hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300 cursor-pointer">Enviar</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </AppFront>
}

export default Contacto;