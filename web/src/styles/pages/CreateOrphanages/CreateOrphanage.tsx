import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import Sidebar from "../../../Components/Sidebar";
import { LeafletMouseEvent } from "leaflet";
import mapIcon from "../../../utils/mapIcon";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

import './styles.css';


export default function CreateOrphanage() {

  const history = useHistory();

  const [inicialPosition, setInicialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);


  useEffect(() => {

    //recupera localização de usuário
    navigator.geolocation.getCurrentPosition(position => {

      const { latitude, longitude } = position.coords;
      setInicialPosition([
        latitude,
        longitude
      ]
      )
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  async function handleSubmit(e: FormEvent) {

    e.preventDefault();

    const [latitude, longitude] = selectedPosition;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })
    
    await api.post('orphanages', data);

    alert('Cadastro Realizado com Sucesso!');

    history.push('/');
    
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      //Mostrar aviso de selecione uma imagem
      return;
    }

    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectedImagesPreview);
  }


  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={inicialPosition}
              onclick={handleMapClick}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} icon={mapIcon} />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Número de Whatsapp</label>
              <input id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

              {previewImages.map(image => {
                return (
                  <img key={image} src={image} alt={name} />
                )
              })} 

              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={ open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                type="button"
                className={!open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
