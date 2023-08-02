import React, { useEffect, useState } from 'react'
import './Settings.css'

//imagem
import ProfileImage from '../../assets/image/CapiPlay.png'

//componentes
import HeaderSettings from './header/HeaderSettings'
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import UserService from './../../service/Index'

const VideoDetails = ({ usuario }) => {

    const [usuario, setUsuario] = useState({});

  const { id } = useParams();

  function edit(event) {
    event.preventDefault()
    UserService.editar(id, user)
    alert("Editado")
  }

  const editarUsuario = (event) => {
    setCard({ ...usuario, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getUsuario = async () => {
      console.log(id)
      await Usuario.buscarUm(id).then(response => {
        setUsuario(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
    getUsuario()
  }, [id])


    const obj = {
        email: 'eeeee',
        nomeUsuario: 'eeee',
        nomeCanal: 'eeee',
        dataNascimento: 'eee',
        senhaAtual: 'eeee',
        senhaNova: 'eeee',
        descricao: 'eeeee'
    }

    const [settingsData, setSettingsData] = useState(obj)
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function handleResize() {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const verifyScreen = () => {
        if (screenSize.width > 900) {
            return false
        } else {
            return true
        }
    }
    return (
        <>
            {verifyScreen() ?
                <div className='settings__container'>
                    <HeaderSettings />
                    <div className="settings__form" >
                        {usuarios.map((usuario) => (
                            <div key={usuario.id} >
                                <img src={ProfileImage} className='profile__settings' /><div className='settings__box__image__options'>
                                    <button className='settings__image__options__buttons'>Alterar</button>
                                    <button className='settings__image__options__buttons'>Remover</button>
                                </div><div class="settings__field">
                                    <Input
                                        placeholder={"Nome de usuário"}
                                        value={usuario.nome}
                                        onChange={(e) => setSettingsData({ ...settingsData, nomeUsuario: e.target.value })}
                                        type={"text"}
                                        required={true}
                                        className='settings__input' />
                                </div><div class="settings__field">
                                    <Input
                                        placeholder={"Nome do canal"}
                                        value={settingsData.nomeCanal}
                                        onChange={(e) => setSettingsData({ ...settingsData, nomeCanal: e.target.value })}
                                        type={"text"}
                                        required={true}
                                        className='settings__input' />
                                </div><div class="settings__field">
                                    <Input
                                        placeholder={"Senha"}
                                        value={usuario.senha}
                                        onChange={(e) => setSettingsData({ ...settingsData, senhaAtual: e.target.value })}
                                        type={"password"}
                                        required={true}
                                        className='settings__input' />
                                </div><div class="settings__field">
                                    <Input
                                        placeholder={"Descrição do canal"}
                                        value={settingsData.descricao}
                                        onChange={(e) => setSettingsData({ ...settingsData, descricao: e.target.value })}
                                        type={"text"}
                                        required={true}
                                        className='settings__input' />
                                </div></div>
                        ))}
                    </div>
                    <br />
                    <hr class="solid" />
                    <div className='settings__options__buttons__delete_div'>
                        <button className='settings__options__buttons__delete'>Deletar perfil</button>
                    </div>
                    <div className='settings__options__buttons__div'>
                        <Button label={"Cancelar"} className='settings__options__buttons__cancel'
                            principal={true} />
                        <Button label={"Confirmar"} className='settings__options__buttons__confirm'
                            principal={false} />
                    </div>
                </div>
                :
                <div className='settings__container__desktop'>
                    <HeaderSettings />
                    <div className="settings__form__desktop">
                        {usuarios.map((usuario) => (
                            <div key={usuario.id} >
                                <img src={ProfileImage} className='profile__settings__desktop' />
                                <div className='settings__box__image__options__desktop'>
                                    <button className='settings__image__options__buttons__desktop'>Alterar</button>
                                    <button className='settings__image__options__buttons__desktop'>Remover</button>
                                </div>
                                <div className='settings__input__container__desktop'>
                                    <div className='settings__input__box'>
                                        <div class="settings__field__desktop">
                                            <Input
                                                placeholder={"Nome de usuário"}
                                                value={usuario.nome}
                                                onChange={(e) => setSettingsData({ ...settingsData, nomeUsuario: e.target.value })}
                                                type={"text"}
                                                required={true}
                                                className='settings__input__desktop'
                                            />
                                        </div>
                                        <div class="settings__field__desktop">
                                            <Input
                                                placeholder={"Nome do canal"}
                                                value={settingsData.nomeCanal}
                                                onChange={(e) => setSettingsData({ ...settingsData, nomeCanal: e.target.value })}
                                                type={"text"}
                                                required={true}
                                                className='settings__input__desktop'
                                            />
                                        </div>
                                    </div>
                                    <div className='settings__input__box'>
                                        <div class="settings__field__desktop">
                                            <Input
                                                placeholder={"Senha"}
                                                value={usuario.senha}
                                                onChange={(e) => setSettingsData({ ...settingsData, senhaAtual: e.target.value })}
                                                type={"password"}
                                                required={true}
                                                className='settings__input__desktop'
                                            />
                                        </div>
                                        <div class="settings__field__desktop">
                                            <Input
                                                placeholder={"Descrição do canal"}
                                                value={settingsData.descricao}
                                                onChange={(e) => setSettingsData({ ...settingsData, descricao: e.target.value })}
                                                type={"text"}
                                                required={true}
                                                className='settings__input__desktop'
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                    <hr className="solid" />
                    <div className='settings__options__buttons__container'>
                        <button className='settings__options__buttons__delete__desktop'>Deletar perfil</button>
                        <div className='settings__options__buttons__div__desktop'>
                            <Button label={"Cancelar"} className='settings__options__buttons__cancel__desktop'
                                principal={false} />
                            <Button label={"Confirmar"} className='settings__options__buttons__confirm__desktop'
                                principal={true} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default VideoDetails