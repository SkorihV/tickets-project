class CurrencyUI {
	constructor() {
		this.currency = document.getElementById("currency");
		this.dictionary = {
			USD: "$",
			EUR: "€",
			RUB: "Р"
		}
	}

	get currencyValue() {
		return this.currency.value;
	}

	getСurrencySimbol() {
		return this.dictionary[this.currencyValue];
	}
}

const currencyUI = new CurrencyUI();

export default currencyUI;