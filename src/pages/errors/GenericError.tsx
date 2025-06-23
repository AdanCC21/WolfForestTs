import { useNavigate, useParams } from "react-router-dom"

export default function GenericError() {
    let { message } = useParams();
    const navigator = useNavigate();
    return (
        <div>
            <h1>Lo sentimos</h1>
            <p>{message}</p>
            <button onClick={() => { navigator('/set') }}>Return</button>
        </div>
    )
}
