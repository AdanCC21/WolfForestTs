type Prompts = {
    image: string
    name: string

    status: boolean
    health: number
    strenght: number
    luck: number
}
export default function SummaryCard({ image, name, status, health, strenght, luck }: Prompts) {
    return (
        <article className="flex flex-col">
            <img className="w-[50px] md:w-[150px] mx-auto my-2 h-fit"
                src={image} alt={name} />
            <p className={status ? 'font-bold' : ''}>{name}</p>
            <div>
                <span>Vida : {health}</span>
                <span>Fuerza : {strenght}</span>
                <span>Suerte : {luck}</span>
            </div>
        </article>
    )
}
