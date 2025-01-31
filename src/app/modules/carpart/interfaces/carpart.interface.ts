import { CrudDocument } from 'wacom';

export interface Carpart extends CrudDocument {
	name: string;
	description: string;
	car: string;
}
