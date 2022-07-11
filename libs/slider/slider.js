
document.addEventListener('DOMContentLoaded', () => {

    const swiper = new Swiper('.slider-block', {
        slidesPerView: 1
    });

    const maxItems = 5;
    const sliderNavItems = document.querySelectorAll('.slider-nav__item');
    const sliderNav = document.querySelector('.slider-nav');

    sliderNavItems.forEach((el, index) => {
         el.setAttribute('data-index', index);

        el.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);

            swiper.slideTo(index);
        })
    })

    const showMore = () => {
        let childrenLength = sliderNav.children.length;
        if (childrenLength > maxItems) {
            sliderNav.insertAdjacentHTML('beforeend', `
              <div class="btn-center">
                  <button class="btn-card">Еще ${childrenLength - maxItems}</button>
              </div>
              `);
            document.querySelectorAll(`.slider-nav__item:nth-child(n+${maxItems + 1})`).forEach(el => {
            el.style.display = 'none';
        });
      }
    }
    showMore();
})
