type Prompts = {
    image: string
    name: string
}
export default function GenericCard({ image, name }: Prompts) {
    return (
        <article className="flex flex-col">
            <img className="w-[50px] md:w-[150px] mx-auto my-2 h-fit"
                src={image} alt={name} />
            <p className="font-semibold">{name}</p>
        </article>
    )
}
