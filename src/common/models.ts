export interface Image {
	url: string;
	alt: string;
	_id: string;
}
export type inputImage = OmitID<Image>;

export interface Address {
	state: string;
	country: string;
	city: string;
	street: string;
	houseNumber: number;
	zip: number;
	_id: string;
}

export type inputAddress = OmitID<Address>;

export type OmitID<T> = Omit<T, "_id">;

export const urlRegex =
	/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
