class Favorits {
	constructor() {
		this.container = document.querySelector(".tickets-sections");
		this.massTicketsStore = {};
		this.dropBtn = document.querySelector(".dropdown-trigger");
		this.dropdownContainer = document.querySelector(".dropdown-content");
	}


	init() {
		this.ceckLocalStorage();
		this.container.addEventListener('click', (e) => {
				let t = e.target;
				let time = new Date();
				let gTime = time.getTime();
				if (t.classList.contains("add-favorite")) {
					e.preventDefault();
					let ticketCard = this.findParent("ticket-card", t);
					let ticketObjConvert = this.conversionElementByObjact(ticketCard);

					if (this.checkDoubleFavorits(ticketObjConvert)) {
						this.massTicketsStore[gTime] = ticketObjConvert
						this.renderTicket(ticketObjConvert, gTime);
						this.createElementLocslStorage();
					}					
				}
		});

		this.dropBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.target.classList.toggle("open");
		})

		this.dropdownContainer.addEventListener('click', (e) => {
			let t = e.target;
			if (t.classList.contains("delete-favorite")) {
				e.preventDefault();
				let favoritCard = this.findParent("favorite-item", t);
				this.deleteFavoritItem(favoritCard);
			}
		})
	}

	findParent (parentClassName, childElement) {
		if ((childElement.parentElement.classList.contains(parentClassName))) {
			return childElement.parentElement;
		}	else if (childElement === document.body || childElement.parentElement === document.body) {
			return false;
		} else {
			return this.findParent(parentClassName, childElement.parentElement);
		}
	}

	conversionElementByObjact(elem) {
		let objTicket = {};
		objTicket.airline_logo = elem.querySelector(".ticket-airline-img").src;
		objTicket.airline_name = elem.querySelector(".ticket-airline-name").innerText;
		objTicket.departure_at = elem.querySelector(".departure_at").innerText;
		objTicket.destination_name = elem.querySelector(".destination_name").innerText;
		objTicket.flight_number = elem.querySelector(".ticket-flight-number").innerText;
		objTicket.origin = elem.querySelector(".ticket-city").innerText;
		objTicket.origin_name = elem.querySelector(".origin_name").innerText;
		objTicket.price = elem.querySelector(".ticket-price").innerText;
		objTicket.transfers = elem.querySelector(".ticket-transfers").innerText;
		return objTicket;
	}
//проверяем есть ли дубли и если нет, то возвращаем false
	checkDoubleFavorits(ticket) {
		let check = true;
		if ( Object.keys(this.massTicketsStore).length === 0){
			check = true;
		}

		for (let item in this.massTicketsStore){
			if (this.massTicketsStore[item].flight_number == ticket.flight_number 
				&& this.massTicketsStore[item].departure_at == ticket.departure_at 
				&& this.massTicketsStore[item].price == ticket.price) {
				check = false;
			}
		}
		
		if (check) {
			return true;
		}
		return false;
	}

	renderTicket(ticket, id) {
		this.dropdownContainer.insertAdjacentHTML("beforeend", Favorits.ticketTemplateFavorits(ticket, id));
	}

	deleteFavoritItem(removeTicket){
		let idTicket = removeTicket.id;
		delete this.massTicketsStore[idTicket]
		removeTicket.remove();
		this.createElementLocslStorage();
	}

	createElementLocslStorage(){
		let massForLocalStorage = JSON.stringify(this.massTicketsStore);
		localStorage.removeItem("favorits");
		localStorage.setItem("favorits", massForLocalStorage)
	}
	ceckLocalStorage() {
		if (localStorage.getItem("favorits")) {
			this.massTicketsStore = JSON.parse(localStorage.getItem("favorits"));

			for (let item in this.massTicketsStore) {
					this.renderTicket(this.massTicketsStore[item], item);
			}
		}
	}

	static ticketTemplateFavorits(ticket, id) {
		return `
			<div class="favorite-item  d-flex align-items-start" id="${id}">
                <img
                  src="${ticket.airline_logo}"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${ticket.origin_name}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${ticket.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">${ticket.transfers}</span>
                    <span class="ticket-flight-number">${ticket.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
              </div>
		`;
	}

}

const favorits = new Favorits();

export default favorits;