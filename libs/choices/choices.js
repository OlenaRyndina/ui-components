const defaultSelect = () => {
	const element = document.querySelector('.default');
	const choices = new Choices(element, {
		/*searchEnabled: false*/
		noResultsText: 'Ничего не найдено',
		
	});
};

defaultSelect();