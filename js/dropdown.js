document.addEventListener('DOMContentLoaded', () => {
	const navBtns = document.querySelectorAll('.nav__btn');
	const drops = document.querySelectorAll('.dropdown');

	function removeNavClasses(currentBtn, drop) {
		navBtns.forEach(el => {
			if (el !== currentBtn) {
				el.classList.remove('nav__btn--active');
			}
		})

		drops.forEach(el => {
			if (el !== drop) {
				el.classList.remove('dropdown--active');
			}
		})
	}

	navBtns.forEach(el => {
		el.addEventListener('click', (e) => {
			let currentBtn = e.currentTarget;
			let drop = currentBtn.closest('.nav__item').querySelector('.dropdown');
			
        navBtns.forEach(el => {
			if (el !== currentBtn) {
				el.classList.remove('nav__btn--active');
			}
		})

		drops.forEach(el => {
			if (el !== drop) {
				el.classList.remove('dropdown--active');
			}
		})

            drop.classList.toggle('dropdown--active');
			currentBtn.classList.toggle('nav__btn--active');
		})
	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('.nav')) {
			navBtns.forEach(el => {			
			    el.classList.remove('nav__btn--active');
     		})

		    drops.forEach(el => {			
			    el.classList.remove('dropdown--active');			
		    })
		}
	})
})