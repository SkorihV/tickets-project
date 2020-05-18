import {getAutocompleteInstance, getDatePickerInstance } from "../plugins/materialize"

class FormUI {
	constructor(autocompleteInstance, datePickerInstance) {
		this._form = document.forms["locationControls"];

		this.origin = document.getElementById("autocomplete-origin");
		this.destination = document.getElementById("autocomplete-destination");

		this.depart = document.getElementById("datepicker-depart");
		this.return = document.getElementById("datepicker-return");

		this.originAutocomplite = autocompleteInstance(this.origin);
		this.destinationAutocomplite = autocompleteInstance(this.destination);

		this.departDatePiker = datePickerInstance(this.depart);
		this.returnDatePiker = datePickerInstance(this.return);
	}

	get form() {
		return this._form;
	}

	get originValue() {
		return this.origin.value;
	}
	
	get destinationValue() {
		return this.destination.value;
	}

	get departDateValue() {
		return this.departDatePiker.toString();
	}

	get returnDateValue() {
		return this.returnDatePiker.toString();
	}

	setAutocompliteData(date) {
		this.originAutocomplite.updateData(date);
		this.destinationAutocomplite.updateData(date);
	}
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;