import "./Historic.css"
import { useState } from "react"
import HeaderToBack from "../../components/headerToBack/HeaderToBack"
import img_video from "../../assets/image/img_video.png"

const Historic = () => {

    // state de vídeo apenas para base 
    const [videos, setVideos] = useState({
        uuid: 1,
        caminho: "",
        descricao: "Descrição do Vídeo",
        titulo: "Título do Vídeo",
        listaTags: [],
        categoria: {},
        miniatura: { img_video }
    });

    const [shorts, setShorts] = useState([]);

    return (
        <div className="historic__container">
            <HeaderToBack text={"Histórico"} route={"/"} />
            {
                videos || shorts
                    ?
                    <div className="historic__date">
                        <span>Data</span>
                        {shorts != null &&
                            <div className="container__shorts__historic">
                                <div></div>
                                <div></div>
                            </div>
                        }
                        {videos &&
                            <div className="container__videos__historic">
                                <img src={videos.miniatura} alt="" />
                                <div></div>
                                <div></div>
                            </div>
                        }
                    </div>
                    :
                    <span>Você ainda não viu nenhum vídeo</span>
            }
        </div>
    )
}
export default Historic