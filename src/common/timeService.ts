export const currentTime = () => {
	const date = new Date(Date.now());

	const year = String(date.getFullYear());
	const month = String(date.getMonth()).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return { year, month, day, hours, minutes, seconds };
};
