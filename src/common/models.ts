export interface Image {
	url: string;
	alt: string;
	_id: string;
}

export interface Address {
	state: string;
	country: string;
	city: string;
	street: string;
	houseNumber: number;
	zip: number;
	_id: string;
}

export type OmitID<T> = Omit<T, "_id">;
