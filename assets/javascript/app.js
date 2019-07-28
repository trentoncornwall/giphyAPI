const buttons = {
	choices: ["neon", "synthwave"],

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
				let giphyObj = response.data[0];
				let buttonImg = giphyObj.images.preview_gif.url;
				let newDiv = $(`<div id=${buttons[i]}>`)
					.addClass("button")
					.css("background-image", `url(${buttonImg})`);

				let imgText = $(`<p>`)
					.addClass("imgTxt")
					.text(buttons[i]);

				let blacklayer = $("<div>").addClass("blacklayer");

				newDiv.append(imgText, blacklayer);

				$("#buttonHolder").append(newDiv);
			});
		}
	},

	createGiphys: function(x) {
		$("#giphycontainer").empty();
		let endPoint = `https://api.giphy.com/v1/gifs/search?api_key=BMZLacTltGEXqTygiH3d5ZCOYjHKyI2b&q=${x}&limit=10&offset=0&rating=PG-13&lang=en`;
		$.ajax({
			url: endPoint,
			method: "GET"
		}).then(function(response) {
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

$(document).ready(function() {
	$("#buttonHolder").on("click", ".button", function() {
		$(".button").removeClass("selected");
		$(this).addClass("selected");
		let term = $(this).attr("id");
		buttons.createGiphys(term);
	});
	$(`#giphycontainer`).on(`click`, "img", function() {
		if ($(this).attr("class") === "selectedimg") {
			$(this).removeClass("selectedimg");
		} else {
			$(this).addClass("selectedimg");
		}
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
});

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
