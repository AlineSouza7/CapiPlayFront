import "./Historic.css"
import { useState } from "react"
import HeaderToBack from "../../components/headerToBack/HeaderToBack"

const Historic = () => {

    // trocar o tipo do state para {} quando houver o Object Video ou Shorts
    const [videos, setVideos] = useState(true);
    const [shorts, setShorts] = useState(true);

    return (
        <div className="historic__container">
            <HeaderToBack text={"Histórico"} route={"/"} />
            {
                videos || shorts
                    ?
                    <span>Data</span>
                    :
                    <span>Você ainda não viu nenhum vídeo</span>
            }
        </div>
    )
}
export default Historic