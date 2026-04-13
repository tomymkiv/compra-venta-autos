import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function index() {
    return (
        <div>
            <div>Admin panel</div>
            <Link href={route('admin.roles.index')} className="p-3 bg-green-800 hover:bg-green-600 rounded-md">
                Roles
            </Link>
        </div>
    )
}
