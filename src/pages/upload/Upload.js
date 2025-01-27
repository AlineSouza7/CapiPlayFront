import './Upload.css'

import { useState, useRef } from "react"
import { HiUpload } from 'react-icons/hi';
import { BsFillFastForwardFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import HeaderUpload from './headerUpload/HeaderUpload';
import Button from "../../components/button/Button";
import InputFile from '../../components/inputFile/InputFile';

function Upload() {

    const [isVideo, setIsVideo] = useState(true)
    const [image, setImage] = useState()
    const imagePreviewRef = useRef(null)

    const [miniatura, setMiniatura] = useState()

    const handleVideoChange = () => {
        setIsVideo(true)
    }
    const handleShortsChange = () => {
        setIsVideo(false)
    }

    const handleFileChange = (e) => {
        // localStorage.setItem("thumbnail", image)
        setMiniatura(e.target.files[0])
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append("foto", file)
            setImage(formData)

            const reader = new FileReader();

            reader.onload = function (event) {
                if (imagePreviewRef.current) {
                    imagePreviewRef.current.src = event.target.result;
                    imagePreviewRef.current.style.display = 'block';
                }
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className='upload__page'>
                <HeaderUpload caminho={"/"} />
                <div className='upload__container'>
                    <div className='upload__buttons__box'>
                        {isVideo &&
                            <>
                                <button className='upload__button__selected' type='button' onClick={handleVideoChange}>
                                    <div className='upload__icons__box__selected'>
                                        <div className='upload__icons__border__selected'>
                                            <HiUpload color='var(--purple)' fontSize={25} />
                                        </div>
                                    </div>
                                    Vídeo
                                </button>
                                <button className='upload__button' type='button' onClick={handleShortsChange}>
                                    <div className='upload__icons__box'>
                                        <div className='upload__icons__border'>
                                            <BsFillFastForwardFill color='var(--whitesmoke)' fontSize={25} />
                                        </div>
                                    </div>
                                    CapiShorts
                                </button>
                            </>
                        }
                        {!isVideo &&
                            <>
                                <button className='upload__button' type='button' onClick={handleVideoChange}>
                                    <div className='upload__icons__box'>
                                        <div className='upload__icons__border'>
                                            <HiUpload color='var(--whitesmoke)' fontSize={25} />
                                        </div>
                                    </div>
                                    Vídeo
                                </button>
                                <button className='upload__button__selected' type='button' onClick={handleShortsChange}>
                                    <div className='upload__icons__box__selected'>
                                        <div className='upload__icons__border__selected'>
                                            <BsFillFastForwardFill color='var(--purple)' fontSize={25} />
                                        </div>
                                    </div>
                                    CapiShorts
                                </button>
                            </>
                        }
                    </div>
                    <div className='upload__divider' />
                    {isVideo &&
                        <div className='upload__right__side__container'>
                            <div className='upload__file__box'>
                                <img
                                    id="upload__image__preview"
                                    ref={imagePreviewRef}
                                    src="#"
                                    alt="Preview da Imagem" />
                                <InputFile
                                    label={"Selecionar arquivo"}
                                    radius={"10px"}
                                    onChange={handleFileChange}
                                    file={image}
                                />
                            </div>
                            <div className='upload__next__buttons__box'>
                                <Button
                                    label={"Cancelar"}
                                    // onClick={}
                                    type={"submit"}
                                    principal={false}
                                />
                                <Link className='upload__next__button__link' to={`/upload-video?miniatura=${encodeURIComponent(miniatura)}`}>
                                    <Button
                                        label={"Próximo"}
                                        // onClick={}
                                        type={"submit"}
                                        principal={true}
                                    />
                                </Link>
                            </div>
                        </div>
                    }
                    {!isVideo &&
                        <div className='upload__right__side__container'>
                            <div className='upload__file__box__shorts'>
                                <img
                                    id="upload__image__preview__shorts"
                                    ref={imagePreviewRef}
                                    src="#"
                                    alt="Preview da Imagem" />

                                <div className='upload__box__all__buttons__shorts'>
                                    {/* <div className='upload__inputfile__box'>
                                        <label htmlFor="upload__inputfile">Selecione um arquivo:</label>
                                        <input
                                            id='upload__inputfile'
                                            className='upload__inputfile'
                                            type="file"
                                            onChange={handleFileChange}
                                            label={"lala arquivo"}
                                            name="video"
                                            file={image}
                                            accept="image/png" />
                                    </div> */}

                                    <InputFile
                                        label={"Selecionar arquivo"}
                                        radius={"10px"}
                                        onChange={handleFileChange}
                                        file={image}
                                    />
                                    <div className='upload__next__buttons__box__shorts'>
                                        <Button
                                            label={"Cancelar"}
                                            // onClick={}
                                            type={"submit"}
                                            principal={false}
                                        />
                                        <Link className='upload__next__button__link' to={`/upload-shorts?miniatura=${encodeURIComponent(miniatura)}`}>
                                            <Button
                                                label={"Próximo"}
                                                // onClick={}
                                                type={"submit"}
                                                principal={true}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Upload