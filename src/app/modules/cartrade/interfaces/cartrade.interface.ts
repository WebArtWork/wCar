import { CrudDocument } from 'wacom';

export interface Cartrade extends CrudDocument {
	name: string;
	description: string;
	car: string;
}
