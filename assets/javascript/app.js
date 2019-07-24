// apikey = BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b
// example endpoint https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=&limit=10&offset=0&rating=PG-13&lang=en

const buttons = {
	choices: ["cats", "dogs"],

	createButtons: function() {
		$("#buttonHolder").empty();
		const buttons = this.choices;

		for (let i = 0; i < buttons.length; i++) {
			let endPoint = `https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=${
				buttons[i]
			}&limit=10&offset=0&rating=PG-13&lang=en`;
			$.ajax({
				url: endPoint,
				method: "GET"
			}).then(function(response) {
				let giphyObj = response.data[i];
				let buttonImg = giphyObj.images.preview_gif.url;
				let newDiv = $(`<div id=${buttons[i]}>`)
					.addClass("button")
					.css("background-image", `url(${buttonImg})`)
					.text(buttons[i]);

				// let imgText = $(`<div>`)
				// 	.addClass("imgTxt")
				// 	.text(buttons[i]);

				// newDiv.append(imgText);

				$("#buttonHolder").append(newDiv);
			});
		}
		wait();
	},

	createGiphys: function(x) {
		let endPoint = `https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=${x}&limit=10&offset=0&rating=PG-13&lang=en`;
		$.ajax({
			url: endPoint,
			method: "GET"
		}).then(function(response) {
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
				newImage = $("<div>")
					.addClass("container")
					.append(
						$(
							`<img src=${still}
					        data-still=${still}
					        data-animated=${animated}
					        data-title=${title}
					        data-rating=${rating}>`
						)
					);
				$("#giphycontainer").append(newImage);
			}
			wait();
		});
	},

	animate: function(x) {
		if (x.attr("src") === x.attr("data-still")) {
			$(x).attr("src", x.attr("data-animated"));
		} else {
			$(x).attr("src", x.attr("data-still"));
		}
	}
};

function wait() {
	$("#buttonHolder").on("click", ".button", function(event) {
		buttons.createGiphys($(this).attr("id"));
	});
	$(`img`).on(`click`, function(event) {
		buttons.animate($(this));
	});

	$("input").on("keyup", function(event) {
		if (event.keyCode === 13) {
			if ($("#newButton").val() === "") {
				return false;
			} else {
				$("#buttonSubmit").click();
			}
		}
	});
}

function submit() {
	if ($("#newButton").val() === "") {
		return false;
	} else {
		buttons.choices.push($("#newButton").val());
		$("#newButton").val("");
		buttons.createButtons();
	}
}
buttons.createButtons();
