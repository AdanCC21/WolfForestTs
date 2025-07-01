import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const navigator = useNavigate();
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <header className="flex flex-col h-4/10 justify-center bg-[#0f0f0f] items-center">
                <img src='/logo.png' alt="logo" className="w-50 object-cover aspect-square" />
                <h1>Wolf Forest</h1>
            </header>
            <main>
                <p>Descripcion importante</p>
                <button onClick={()=>{navigator('/set')}}>Jugar</button>
            </main>
            <footer>
                @Adan Gonzalez
            </footer>
        </div>
    )
}
