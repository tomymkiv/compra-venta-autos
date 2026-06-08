export default function CarPostData({ data, title }: { data: string, title: string }) {
    return <p className="text-md md:text-lg lg:text-xl"><b>{title}:</b> {data}</p>
}