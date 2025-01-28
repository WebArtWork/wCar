import { CrudDocument } from 'wacom';

export interface Carrecord extends CrudDocument {
	name: string;
	description: string;
	car: string;
	place: string;
}
