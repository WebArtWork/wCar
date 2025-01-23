import { CrudDocument } from 'wacom';

export interface Carplace extends CrudDocument {
	name: string;
	description: string;
}
