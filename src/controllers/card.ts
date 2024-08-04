import { ICity } from '../models/ICity';
import { CitiesController } from './cities.controller';

export const Card = (props: ICity): HTMLElement => {
    let { id, city, country, image, cityDescription, temperature } = props;
    const cardContainer = document.createElement("article") as HTMLElement;
    cardContainer.className = "card-container";

    const img = document.createElement("img") as HTMLImageElement;
    img.className = "img-card";

    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "cardInfo-container";

    const cardTitle = document.createElement("h3") as HTMLHeadElement;
    cardTitle.className = "card-title";
    const cardCountry = document.createElement("p") as HTMLParagraphElement;
    const cardDescription = document.createElement("p") as HTMLParagraphElement;
    const cardTemperature = document.createElement("p") as HTMLParagraphElement;

    img.src = image;
    cardTitle.innerText = city;
    cardCountry.innerText = country;
    cardDescription.innerText = cityDescription;
    cardTemperature.innerText = `${temperature} k`;

    const crossContainer = document.createElement("span");
    crossContainer.className = "cross-container";
    crossContainer.innerHTML = `<i product-id="${id}" class="bi bi-x-circle-fill"></i>`;

    const updateButton = document.createElement("button");
    updateButton.innerText = "Actualizar";
    updateButton.className = "update-button";

    updateButton.addEventListener("click", () => {
        
        // Actualiza los valores del formulario
        (document.querySelector("#new-city") as HTMLInputElement).value = city;
        (document.querySelector("#new-country") as HTMLInputElement).value = country;
        (document.querySelector("#new-img") as HTMLInputElement).value = image;
        (document.querySelector("#newCity-description") as HTMLTextAreaElement).value = cityDescription;
        
        // Almacena el ID de la ciudad para actualizar
        const cityIdInput = document.querySelector("#city-id") as HTMLInputElement;
        if (cityIdInput) {
            cityIdInput.value = String(id); // Convertimos el id a string
        }
    });

    crossContainer.addEventListener("click", async () => {
        const eliminar = confirm('¿Deseas eliminar?');
        if (eliminar) {
            try {
                const citiesController = new CitiesController('http://localhost:3000/');
                await citiesController.deleteCities(`cities/${id}`);
                cardContainer.remove();
            } catch (error) {
                console.error("Error al eliminar la ciudad:", error);
            }
        }
    });

    infoContainer.append(cardTitle, cardCountry, cardDescription, cardTemperature, updateButton);
    cardContainer.append(img, infoContainer, crossContainer);

    return cardContainer;
};
