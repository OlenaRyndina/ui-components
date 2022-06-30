const fixedBlock = document.querySelector('.filters-price'),
      filters = document.querySelector('.filters'),
      gutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter')),
      container = document.querySelector('.container'),
      offsetLeft = container.offsetLeft + gutter,
      filtersOffsetTop = filters.offsetTop,
      filtersWidth = filters.offsetWidth, 
      smallOffset = gutter;

      console.log(smallOffset);

      const fixedScrollBlock = () => {
      	let scrollDistance = window.scrollY;

      	if (scrollDistance > (filtersOffsetTop - smallOffset) && scrollDistance <= (filters.offsetHeight + filtersOffsetTop)) {
      		fixedBlock.style.left = `${offsetLeft}px`;
      		fixedBlock.classList.remove('absolute');
      		fixedBlock.classList.add('fixed');
      	} else {
      		fixedBlock.style.left = `0px`;
      		fixedBlock.style.width = `256px`;
      		fixedBlock.classList.remove('fixed');
      	}

      	if (scrollDistance >= (filtersOffsetTop - smallOffset) + filters.offsetHeight - fixedBlock.offsetHeight) {
      		fixedBlock.classList.add('absolute');
      		fixedBlock.style.left = `0px`;
      		fixedBlock.style.width = `256px`;
      		fixedBlock.classList.remove('fixed');
      	}
      };

      window.addEventListener('scroll', fixedScrollBlock);