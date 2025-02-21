import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CarService extends CrudService<Car> {
	cars: Car[] = this.getDocs(); // Масив для збережених автомобілів
	carsByMake: Record<string, Car[]> = {}; // Об'єкт для групування автомобілів за маркою

	constructor() {
		super({
			name: 'car'
		});

		this.get(); // Отримуємо всі автомобілі
		this.filteredDocuments(this.carsByMake); // Фільтруємо автомобілі за маркою
	}

	carsSaved: Car[] = []; // Масив для збережених автомобілів

	saveCar(car: Car) {
		if (!this.carsSaved.find((c) => c._id === car._id)) {
			this.carsSaved.push(car);
			console.log('Car saved:', car);
		}
	}
}
