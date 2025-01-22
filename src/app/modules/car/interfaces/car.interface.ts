import { CrudDocument } from 'wacom';

export interface Car extends CrudDocument {
	name: string;
	description: string;
}
