import React, { useEffect, useState } from "react";
import "./MainMenu.css";
import axios from "axios";

const MainMenu = () => {
  const [formData, setFormData] = useState({ name: "", lib: "Библиотека" });
  const [nameOfRoom, setNameOfRoom] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [roomsList, setRoomsList] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddLibrary = () => {
    setFormData({ ...formData, lib: formData.name });
  };

  const handleAddRoom = (name, typeOfRoom) => {
    console.log(typeOfRoom);
    if (typeOfRoom === "Читальный зал") {
      axios.post("https://localhost:7136/createNewHall?name=" + name)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        }).catch(error => {
          console.error(error.response.data);
        })
    }
    if (typeOfRoom === "Абонимент") {
      axios.post("https://localhost:7136/createNewStock?name=" + name)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        }).catch(error => {
          console.error(error.response.data);
        })
    }
  }

  useEffect(() => {
    axios.get("https://localhost:7136/getRooms")
      .then(response => {
        setRoomsList(response.data)
      })
      .catch(error => {
        console.error(error.response.data);
      })
  })

  return (
    <>
      <h1 className="heading">{formData.lib}</h1>
      <div className="libNameBlock">
        Название библиотеки:<input className="inputNameOfLib"
          title="Введите название"
          maxLength="30"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <button onClick={handleAddLibrary} className="addButton">Добавить</button>
      </div>
      <div className="roomNameBlock">
        Наименование помещения: <input className="inputNameOfRoom" title="Введите наименование" name="nameOfRoom"
          value={nameOfRoom}
          onChange={event => setNameOfRoom(event.target.value)} />
        <button className="addButton" onClick={() => handleAddRoom(nameOfRoom, typeOfRoom)}>Добавить</button>
      </div>
      <div className="typeRoomBlock">
        Тип помещения:
        <input type="radio" name="typeOfRoom" value="Абонимент" checked={typeOfRoom === "Абонимент"} onChange={(event) => setTypeOfRoom(event.target.value)} />
        Абонимент
        <input type="radio" name="typeOfRoom" value="Читальный зал" checked={typeOfRoom === "Читальный зал"} onChange={(event) => setTypeOfRoom(event.target.value)} />
        Читальный зал
      </div>
      <div className="deleteRoomBlock">
        Удалить помещение
        <select className="inputNameOfRoom">
          {roomsList.map((room) => (
            <option key={room}>{room.name}</option>
          ))}
        </select>

        <button className="addButton">Удалить</button>
      </div>
      <div className="editionNameBlock">
        Наименование издания: <input title="Введите наименование издания" /> Год:
        <input title="Введите год издания" />
      </div>
      <div className="numberEditionBlock">
        Номер:<input title="Введите номер издания" /> Автор:
        <input title="Введите автора" />
      </div>
      <div className="editionTypeBlock">
        Тип издания:
        <input type="radio" id="book" name="type" />Книга
        <input type="radio" id="magazine" name="type" />Журнал
        Поместить в:
        <select>
          <option>Абонимент</option>
          <option>Читальный зал</option>
        </select>
        <button>Добавить</button>
      </div>
    </>
  );
};

export default MainMenu;