import React, { useEffect, useState } from "react";
import "./MainMenu.css";
import axios from "axios";

const MainMenu = () => {
  const [formData, setFormData] = useState({ name: "", lib: "Библиотека" });
  const [nameOfRoom, setNameOfRoom] = useState("");
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [roomsList, setRoomsList] = useState([]);
  const [deleteName, setDeletename] = useState("");
  const [nameItem, setNameItem] = useState("");
  const [number, setNumber] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [info, setInfo] = useState("");

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

  const handleDeleteRoom = (name) => {
    axios.delete("https://localhost:7136/deleteRoom?name=" + name)
      .then(response => {
        console.log(response.data);
        axios.get("https://localhost:7136/getRooms")
          .then(response => {
            setRoomsList(response.data)
          })
          .catch(error => {
            console.error(error.response.data);
          })
      }
      ).catch(error => {
        console.error(error.response.data);
      })
  }


  const handleAddItem = (nameOfRoom, nameItem, number, year, type) => {
    setInfo(type + ": " + nameItem + " добавлена в комнату " + nameOfRoom);
    if (type === "Журнал") {
      axios.post("https://localhost:7136/createNewMagazine?nameOfRoom=" + nameOfRoom + "&nameOfMagazine=" + nameItem + "&number=" + number + "&year=" + year)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        }).catch(error => {
          console.error(error.response.data);
        })
    }
    if (type === "Книга") {
      axios.post("https://localhost:7136/createNewBook?nameOfRoom=" + nameOfRoom + "&nameOfBook=" + nameItem + "&author=" + author + "&year=" + year)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
          }
        }).catch(error => {
          console.error(error.response.data);
        })
    }
  };

  const [type, setType] = useState(""); // Состояние для типа издания

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    // Вызов функции с передачей выбранного значения типа издания
    myFunction(type);
  };

  const myFunction = (selectedType) => {
    // Логика обработки выбранного значения типа издания
    console.log("Выбранный тип издания:", selectedType);
  };

  const [selectedOption, setSelectedOption] = useState(""); // Состояние для выбранного значения

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit1 = () => {
    // Обработка отправки формы
    console.log("Выбранное значение:", selectedOption);
  };


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
        <select className="inputNameOfRoom" value={deleteName} onChange={(event) => setDeletename(event.target.value)}>
          {roomsList?.map((room) => (
            <option key={room.name} onClick={() => setDeletename(room.name)}>{room.name}</option>
          ))}
        </select>

        <button className="addButton" onClick={() => handleDeleteRoom(deleteName)}>Удалить</button>
      </div>
      <div className="editionNameBlock">
        Наименование издания: <input title="Введите наименование издания" value={nameItem} onChange={(event) => setNameItem(event.target.value)} />
        Год: <input title="Введите год издания" value={year} onChange={(event) => setYear(event.target.value)} />
      </div>
      <div className="numberEditionBlock">
        Номер:<input title="Введите номер издания" value={number} onChange={(event) => setNumber(event.target.value)} />
        Автор:<input title="Введите автора" value={author} onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div className="editionTypeBlock">
        <div className="editionTypeBlock">
          Тип издания:
          <input
            type="radio"
            id="book"
            name="type"
            value="book"
            checked={type === "book"}
            onChange={handleTypeChange}
          />
          Книга
          <input
            type="radio"
            id="magazine"
            name="type"
            value="magazine"
            checked={type === "magazine"}
            onChange={handleTypeChange}
          />
          Журнал
        </div>
        <div className="editionTypeBlock">
          Поместить в:
          <select value={selectedOption} onChange={handleOptionChange}>
          {roomsList?.map((room) => (
            <option key={room.name} onClick={() => setDeletename(room.name)}>{room.name}</option>
          ))}
          </select>
          <button onClick={() => handleAddItem(nameOfRoom, nameItem, number, year, type)}>Добавить</button>
        </div>
      </div>
      <div className="editionTypeBlock">
        <div>
          Вся информация о библиотеке
        </div>
        <div>
          Название: {formData.lib}
        </div>
        <div>
          Количество помещений: {roomsList.length }
        </div>
        <div>
          Информация о добавлении элемента: {info}
        </div>
      </div>
    </>
  );
};

export default MainMenu;