import React from "react";
import "./MainMenu.css"

const MainMenu = () => {
    return <>
        <h1>Библиотека лоха</h1>
        <div className="libNameBlock">Название библиотеки: <input title="Введите название" /><button>Добавить</button></div>
        <div className="roomNameBlock">Наименование помещения: <input title="Введите наименование" /><button>Добавить</button></div>
        <div>Тип помещения:<input type="radio" name="typeOfRoom" checked/>Абонимент<input type="radio" name="typeOfRoom" />Читальный зал</div>
        <div>Удалить помещение
            <select>
                <option>Абонимент</option>
                <option>Читальный зал</option>
            </select>
            <button>Удалить</button></div>
        <div>Наименование издания: <input title="Введите наименование издания" /> Год:<input title="Введите год издания" /></div>
        <div>Номер:<input title="Введите номер издания" /> Автор:<input title="Введите автора" /></div>
       <div>Тип издания:<input type="radio" id="book" name="type" checked/>Книга
            <input type="radio" id="magazine" name="type" />Журнал<button>Добавить</button></div>
    </>

}

export default MainMenu;