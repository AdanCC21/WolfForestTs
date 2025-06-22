import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const navigator = useNavigate();
    return (
        <>
            <header>
                <img src={''} alt="logo" />
                <h1>Wolf Forest</h1>
            </header>
            <main>
                <p>Descripcion importante</p>
                <button onClick={()=>{navigator('/set')}}>Jugar</button>
            </main>
            <footer>
                @Adan Gonzalez
            </footer>
        </>
    )
}
