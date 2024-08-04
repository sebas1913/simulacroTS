import { ICity } from "../models/ICity";

export class CitiesController {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getCities(endPoint: string): Promise<ICity> {
        const response = await fetch(`${this.url}${endPoint}`);
        const data = await response.json();
        console.log(response.status);

        return data;
    }

    async postCities(endPoint: string, dataCity: ICity) {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCity)
        });

        console.log(response.status);

        if (response.status !== 201) {
            throw new Error(`No se puede publicar`);
        }

        const data = await response.json();
        return data;
    }

    async deleteCities(endPoint: string): Promise<ICity> {
        const headers: Record<string, string> = {
            "accept": "*/*",
        };
        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers,
        };

        const response: Response = await fetch(`${this.url}${endPoint}`, reqOptions);

        if (!response.ok) {
            throw new Error(`Error al eliminar la ciudad: ${response.statusText}`);
        }

        const responseDelete: ICity = await response.json();
        return responseDelete;
    }

    async updateCities(id: string, endPoint: string, dataCity: ICity): Promise<ICity> {
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
        };

        const reqOptions: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(dataCity)
        };

        const response: Response = await fetch(`${this.url}${endPoint}${id}`, reqOptions);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Error al actualizar la ciudad: ${response.statusText}`);
        }

        const updatedCity: ICity = await response.json();
        return updatedCity;
    }
}
