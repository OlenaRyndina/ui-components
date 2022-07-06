document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelector('.tabs');
    const tabsBtn = document.querySelectorAll('.tabs__btn');
    const tabsContent = document.querySelectorAll('.tabs__content');

    if(tabs) {
        tabs.addEventListener('click', (e) => {
        	if(e.target.classList.contains('tabs__btn')) {
        		let tabsPath = e.target.dataset.tabsPath;
        		tabsBtn.forEach(el => {        	
    	            el.classList.remove('tabs__btn--active')
    	        });    	
    	        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');       
        		tabsHandler(tabsPath);
        	}

        	if (e.target.classList.contains('tabs__arrow--prev')) {
        		let previousParent = document.querySelector('.tabs__btn--active').closest('.tabs__item').previousElementSibling;
        		changeActiveClass(previousParent);
        	}        	

        	if (e.target.classList.contains('tabs__arrow--next')) {
        		let nextParent = document.querySelector('.tabs__btn--active').closest('.tabs__item').nextElementSibling;
        		changeActiveClass(nextParent);
        	}
        });
    }

    const changeActiveClass = (parent) => {
        let activeBtn = document.querySelector('.tabs__btn--active'); 
        let activeParent = activeBtn.closest('.tabs__item');

        if (parent) {
            let activeTab = parent.querySelector('.tabs__btn');
            tabsBtn.forEach(el => {
                el.classList.remove('tabs__btn--active')
            });
            activeTab.classList.add('tabs__btn--active');

            let path = activeTab.dataset.tabsPath;
            tabsHandler(path);
        }
    }

    const tabsHandler = (path) => {
    
        tabsContent.forEach(el => {
        	el.classList.remove('tabs__content--active');
        })

        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
    }
});

