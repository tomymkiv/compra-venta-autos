import { Link } from "react-router-dom";

function NotFoundPage() {
    return <>
        <div className="flex flex-col gap-5">
            <h2>error 404</h2>
            <Link to={'/'}>
                <button className="p-3 bg-green-600/60">volver al menu</button>
            </Link>
        </div>
    </>;
}

export default NotFoundPage;