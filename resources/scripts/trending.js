
// DOM elements trending tags
const $trendingTagList = document.querySelector('#trendingTag_list');

// TODO ---------------------- Trending Styles ----------------------  \\
// Setea los botones previo y next, de acuerdo al estado y al theme elegido
const setTrendingBtn = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		$previousBtn.src = 'resources/assets/button-slider-left-md-noct.svg';
		$nextBtn.src = 'resources/assets/button-slider-right-md-noct.svg';
	} else {
		$previousBtn.src = 'resources/assets/button-slider-left.svg';
		$nextBtn.src = 'resources/assets/Button-Slider-right.svg';
	}
};

$previousBtn.addEventListener('mouseover', () => {
	$previousBtn.src = 'resources/assets/button-slider-left-hover.svg';
});

$nextBtn.addEventListener('mouseover', () => {
	$nextBtn.src = 'resources/assets/Button-Slider-right-hover.svg';
});

$previousBtn.addEventListener('mouseout', setTrendingBtn);
$nextBtn.addEventListener('mouseout', setTrendingBtn);

// TODO ---------------------- Trending API ----------------------  \\

// TODO ------- Trending TAGS

const getTrendingTags = async () => {
	await fetch(`${trendingTagsEndpoint}?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((trendingTags) => {
			console.log(trendingTags);
			displayTrendingTags(trendingTags);
		})
		.catch((err) => console.log(err));
};

getTrendingTags();

const displayTrendingTags = (trendingTags) => {
	for (let i = 0; i < 6; i++) {
		const trendingTagItem = document.createElement('span');
		trendingTagItem.classList.add('trending_item');
		trendingTagItem.setAttribute(
			'onclick',
			`getSearch("${trendingTags.data[i]}")`
		);
		trendingTagItem.innerHTML = `${trendingTags.data[i]}`;
		$trendingTagList.appendChild(trendingTagItem);
	}
};

// TODO ------- Trending SLIDER
const getTrendingGif = async () => {
	await fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((results) => {
			console.log(results);
			displayTrendingGifs(results);
		})
		.catch((err) => console.error(err));
};

getTrendingGif();

const displayTrendingGifs = (results) => {
	for (let i = 0; i < 2 /* results.data.length*/; i++) {
		let trendingGif = results.data[i];
		let trendingGifImage = trendingGif.images.original.url;
		let trendingGifUserName = trendingGif.username;
		let trendingGifTitle = trendingGif.title;

		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif_container');
		gifContainer.innerHTML = ` 
		<div>
		
		<div class="giphy-controls">
				<img src="resources/assets/icon-fav-active.svg" onclick="addToFav('${trendingGifImage}','${trendingGifUserName}','${trendingGifTitle}')" alt="icon favoritos">
				<img src="resources/assets/icon-download.svg" onclick="downloadGif('${trendingGifImage}','${trendingGifTitle}')" alt="icon download">
				<img src="resources/assets/icon-max-normal.svg" onclick="maximizeGif('${trendingGifImage}','${trendingGifUserName}','${trendingGifTitle}')" alt="icon maximize">	
		</div>
		<img class="gif" src="${trendingGifImage}" alt="${trendingGifTitle}">
		</div>
		`;

		/*
		info
		<div class="gif_info">
			<p class="gif_user">${trendingGifUserName}</p>
			<p class="gif_title">${trendingGifTitle}</p>
		</div>
		*/
		$trendingSlider.appendChild(gifContainer);
	}
};

const nextSliderBtn = () => {
	$trendingSlider.scrollLeft += 400;
};

const prevSliderBtn = () => {
	$trendingSlider.scrollLeft -= 400;
};

$nextBtn.addEventListener('click', nextSliderBtn);
$previousBtn.addEventListener('click', prevSliderBtn);

