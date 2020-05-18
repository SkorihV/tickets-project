import '../css/style.css';
import './plugins';
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets.js";
import currancyUi from "./views/currency";
import favorits from "./store/favoritesStore.js";


document.addEventListener("DOMContentLoaded", () => {
	initApp();
	favorits.init();
	const form = formUI.form;
	//Events

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		onFormSubmit();
	});

	//Handlers
	async function initApp() {
		await locations.init();
		formUI.setAutocompliteData(locations.shortCities);


	}

	async function onFormSubmit() {
		//собрать данные из импутов
		const origin = locations.getCityCodeByKey(formUI.originValue);
		const destination = locations.getCityCodeByKey(formUI.destinationValue);
		const depart_date = formUI.departDateValue;
		const return_date = formUI.returnDateValue;

		const currancy = currancyUi.currencyValue;
		console.log(currancy)
		// code , code, 2019-09, 2019-10
		await locations.fetchTickets({
			origin,
			destination,
			depart_date,
			return_date,
			currancy,
		})

		ticketsUI.renderTickets(locations.lastSearch);
	}
});



