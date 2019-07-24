// apikey = BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b
// example endpoint https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=&limit=10&offset=0&rating=PG-13&lang=en

const buttons = {
	choices: ["cats", "dogs"],

	createButtons: function () {
		$("#choices").empty();
		let buttons = this.choices;

		//* creating individual buttons and appending it to #choices
		for (let i = 0; i < buttons.length; i++) {
			// newButton = $(`<button id=${buttons[i]}>`)
			// 	.text(buttons[i])
			// 	.addClass("search");
			// $("#choices").prepend(newButton);
			let term = buttons[i];
			let endPoint = `https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=${term}&limit=10&offset=0&rating=PG-13&lang=en`;
			$.ajax({
				url: endPoint,
				method: "GET"
			}).then(function (response) {
				let termObj = response.data[i]
				let termGif = termObj.images.preview_gif.url
				let divBttn = $("<div class='search'>").attr("id", term)
				let divImg = $("<div>")
					.addClass("divImg")
					.css("background-image", `url(${termGif})`);
				divBttn.append(divImg);
				$("#choices").append(divBttn)
			})

		}

		wait();
	},

	createGiphys: function (x) {
		let endPoint = `https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=${x}&limit=10&offset=0&rating=PG-13&lang=en`;
		$.ajax({
			url: endPoint,
			method: "GET"
		}).then(function (response) {
			$("#giphycontainer").empty();
			//* response  contains 10 objects, parsing objects and creating gifs
			for (let i = 0; i < response.data.length; i++) {
				//* obtaining info
				let giphyObj = response.data[i];
				let title = giphyObj.title;
				let rating = giphyObj.rating;
				let animated = giphyObj.images.original.url;
				let still = giphyObj.images.original_still.url;
				//* assemble image
				newImage = $(
					`<img src=${still}
					        data-still=${still}
					        data-animated=${animated}
					        data-title=${title}
					        data-rating=${rating}>`
				);
				$("#giphycontainer").append(newImage);
			}
			wait();
		});
	},

	animate: function (x) {
		if (x.attr("src") === x.attr("data-still")) {
			$(x).attr("src", x.attr("data-animated"));
		} else {
			$(x).attr("src", x.attr("data-still"));
		}
	}
};

function wait() {
	$(`#choices`).on(`click`, ".search", function (event) {
		const term = $(this).attr("id");
		buttons.createGiphys(term);
	});

	$(`img`).on(`click`, function (event) {
		buttons.animate($(this));
	});

	$("input").on("keyup", function (event) {
		if (event.keyCode === 13) {
			$("#buttonSubmit").click();
		}
	});
}

function submit() {
	buttons.choices.push($("#newButton").val());
	$("#newButton").val("");
	buttons.createButtons();
}
buttons.createButtons();