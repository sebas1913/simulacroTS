import { ICity } from "../models/ICity";
import { Card } from "./card";
import { CitiesController } from "./cities.controller";

const logoutButton = document.querySelector("#logout-button") as HTMLButtonElement;
const session = sessionStorage.getItem('token');

const url = 'http://localhost:3000/';

const cardSection = document.querySelector('#card-section') as HTMLElement;

(() => {
    if (!session) {
        alert('debes iniciar sesión');
        window.location.href = '../../index.html'
    }
})();

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
});

async function showCities() {
    const citiesController = new CitiesController(url);
    const cities = await citiesController.getCities('cities');
    
    cities.forEach((city: ICity) => {
        cardSection?.append(Card(city));
    });
}

showCities();
