import { useState } from "react"
import { newPlayer } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { useValidatePlayers } from "../hooks/validate";
import { response } from "../entities/result.entity";

export default function SetPlayers() {
    const [players, setPlayers] = useState<Array<newPlayer>>([{ image: '', name: 'Player 1' }]);
    const [alert, setAlert] = useState<string>('');
    const navigator = useNavigate();

    const addPlayer = () => {
        if (players.length > 50) {
            setAlert('Maximo de jugadores excedido');
        }
        let temp: newPlayer = {
            image: '',
            name: `Player ${players.length + 1}`
        }
        setPlayers(prev => { return { ...prev, temp } });
    }

    const play = () => {
        let playersOk: response = useValidatePlayers(players);
        if (playersOk.result) {
            
            sessionStorage.setItem('players', JSON.stringify(players));
            navigator('/game');
        } else {
            setAlert(playersOk.message);
        }
    }

    return (
        <>
            <header>
                <h1>Jugadores</h1>
                <p>Players Number : {players.length}</p>
                <span>{alert}</span>
            </header>

            <main>
                <section>
                    {players.map((current) => (
                        <article key={current.name}>
                            <img src={current.image} alt={current.name} />
                            <div>
                                <input placeholder="Image Url" value={current.image} name="image" />
                                <input placeholder="Image Url" value={current.name} name="name" />
                            </div>
                        </article>
                    ))}
                    <button onClick={() => { addPlayer() }}>+ Add Player</button>
                </section>

                <button onClick={() => { play() }}>Jugar</button>
            </main>

            <footer>
                @Adan Gonzalez Cesena
            </footer>
        </>
    )
}
