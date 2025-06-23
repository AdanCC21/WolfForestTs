import { useState } from "react"
import { newPlayer, Player } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { useValidatePlayers } from "../hooks/validate";
import { response } from "../entities/result.entity";

export default function SetPlayers() {
    const [players, setPlayers] = useState<Array<newPlayer>>([{ id: 1, image: '', name: 'Player 1' }]);
    const [alert, setAlert] = useState<string>('');
    const navigator = useNavigate();

    const addPlayer = () => {
        if (players.length > 50) {
            setAlert('Maximo de jugadores excedido');
        }
        let temp: newPlayer = {
            id: players.length + 1,
            image: '',
            name: `Player ${players.length + 1}`
        }
        setPlayers(prev => { return [...prev, temp] });
    }

    const play = () => {
        let playersOk: response = useValidatePlayers(players);
        if (playersOk.result) {
            let playersList = players.map((current) => {
                return new Player(current.id, current.name, current.image)
            })
            sessionStorage.setItem('players', JSON.stringify(playersList));
            navigator('/game');
        } else {
            setAlert(playersOk.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, currentPlayer: newPlayer) => {
        const { value, name } = e.target;

        const updatedPlayer = {
            ...currentPlayer,
            [name]: value,
        };

        const updatedPlayers = players.map((player) =>
            player.id === currentPlayer.id ? updatedPlayer : player
        );

        setPlayers(updatedPlayers);
    };


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
                        <article key={current.id}>
                            <img src={current.image || 'w'} alt={current.name} />
                            <div>
                                <input placeholder="Image Url" value={current.image} name="image"
                                    onChange={(e) => { handleChange(e, current) }} />
                                <input placeholder="Image Url" value={current.name} name="name"
                                    onChange={(e) => { handleChange(e, current) }} />
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
