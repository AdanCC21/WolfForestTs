import { useState } from "react"
import { newPlayer } from "../entities/player.entity";
import { useNavigate } from "react-router-dom";
import { useValidatePlayers } from "../hooks/validate";
import { response } from "../entities/result.entity";

export default function SetPlayers() {
    const [players, setPlayers] = useState<Array<newPlayer>>([{ id: 1, image: 'https://media1.tenor.com/m/DbkOnZvFb6MAAAAd/glorp-outer-space.gif', name: 'Player 1' }]);
    const [alert, setAlert] = useState<string>('');
    const navigator = useNavigate();

    const addPlayer = () => {
        if (players.length > 50) {
            setAlert('Maximo de jugadores excedido');
        }
        let temp: newPlayer = {
            id: players.length + 1,
            image: 'https://media1.tenor.com/m/DbkOnZvFb6MAAAAd/glorp-outer-space.gif',
            name: `Player ${players.length + 1}`
        }
        setPlayers(prev => { return [...prev, temp] });
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
        <div className="flex flex-col justify-between min-h-screen overflow-x-hidden bg-default">
            <header className="w-screen flex flex-col items-center my-5">
                <h1>Set Players</h1>
                <p>Players Number :</p>
                <h2 className="text-green-500">{players.length}</h2>
                <span>{alert}</span>
            </header>

            <main className="flex flex-col w-screen items-center">
                <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 w-8/10 my-3">
                    {players.map((current) => (
                        <article key={current.id} className="flex flex-col">
                            <div className="relative w-full">
                                <button className="absolute right-[-20px] bg-[#272727] rounded-full">
                                    x
                                </button>
                                <img className="rounded-md mx-auto my-2" src={current.image || 'w'} alt={current.name} />
                            </div>
                            <div className="my-2 w-full">
                                <input placeholder="Image Url" value={current.image} name="image"
                                    onChange={(e) => { handleChange(e, current) }}
                                    className="w-full mb-5 overflow-ellipsis" />
                                <input placeholder="Image Url" value={current.name} name="name"
                                    onChange={(e) => { handleChange(e, current) }}
                                    className="w-full mb-5 overflow-ellipsis" />
                            </div>
                        </article>
                    ))}
                    <button className="my-auto mx-auto size-fit" onClick={() => { addPlayer() }}>+ Add Player</button>
                </section>

                <button className="w-fit" onClick={() => { play() }}>Jugar</button>
            </main>

            <footer className="flex flex-col items-center justify-end w-screen min-h-[10vh]">
                <small className="mb-2">@Adan Gonzalez</small>
            </footer>
        </div>
    )
}
