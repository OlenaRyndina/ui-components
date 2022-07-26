const burger = document?.querySelector('[data-burger]');
const nav = document?.querySelector('[data-nav]');
const navItems = nav?.querySelectorAll('a');

burger?.addEventListener('click', () => {
	burger?.classList.toggle('burger--active');
	nav?.classList.toggle('nav--visible');
})

navItems.forEach(el => {
	el.addEventListener('click', () => {
		burger?.classList.remove('burger--active');
	    nav?.classList.remove('nav--visible');
	})
})