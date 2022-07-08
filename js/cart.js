document.addEventListener('DOMContentLoaded', () => {

    const productsBtn = document.querySelectorAll('.product__btn');
    const cartProductList = document.querySelector('.cart-content__list');
    const cart = document.querySelector('.cart');
    const cartQuantity = document.querySelector('.cart__quantity');
    const fullPrice = document.querySelector('.fullprice');
    const orderModalOpenProd = document.querySelector('.order-modal__btn');
    const orderModalList = document.querySelector('.order-modal__list');
    let flag = 0;
    let price = 0;
    let randomId = 0;
    let productArr = [];

    /*const randomId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }*/

    const priceWithoutSpaces = (str) => {
        return str.replace(/\s/g, '');
    };

    const normalPrice = (str) => {
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };

    const plusFullPrice = (currentPrice) => {
        return price += currentPrice;
    }

    const minusFullPrice = (currentPrice) => {
        return price -= currentPrice;
    }

    const printFullPrice = () => {
        fullPrice.textContent = `${normalPrice(price)} гр.`;
    }

    const printQuantity = () => {
        let length = cartProductList.querySelector('.simplebar-content').children.length;
        cartQuantity.textContent = length;
        length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
    }

    const generateCartProduct = (img, title, price, id) => {
        return `
            <li class="cart-content__item">
                <article class="cart-content__product cart-product" data-id="${id}">
                    <img src="${img}" alt="Макбук" class="cart-product__img">
                    <div class="cart-product__text">
                        <h3 class="cart-product__title">
                            ${title}
                        </h3>
                        <span class="cart-product__price">${normalPrice(price)} гр.</span>
                    </div>
                    <button class="cart-product__delete" aria-label="Удалить товар"></button>
                </article>
            </li>
        `
    }

    const deleteProducts = (productParent) => {
        let id = productParent.querySelector('.cart-product').dataset.id;
        console.log(id);
        console.log(document.querySelector(`.product[data-id="${id}"]`));
        document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;

        let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
        minusFullPrice(currentPrice);
        printFullPrice();
        productParent.remove();
        printQuantity();

        updateStorege();
    }

    const countSumm = () => {
        document.querySelectorAll('.cart-content__item').forEach(el => {
            price += parseInt(priceWithoutSpaces(el.querySelector('.cart-product__price').textContent));
        })
    }

    productsBtn.forEach(el => {
        el.closest('.product').setAttribute('data-id', randomId++);
        el.addEventListener('click', (e) => {
            let self = e.currentTarget;
            let parent = self.closest('.product');
            let id = parent.dataset.id;
            let img = parent.querySelector('.image-switch__img img').getAttribute('src');
            let title = parent.querySelector('.product__title').textContent;
            let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent));
        
            plusFullPrice(priceNumber);
            printFullPrice();
            cartProductList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id))
            printQuantity();

            updateStorege();
            self.disabled = true;
        })
    })

    cartProductList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-product__delete')) {
            deleteProducts(e.target.closest('.cart-content__item'));
        }
    })

    const initialState = () => {
        if (localStorage.getItem('products') !== null) {
            cartProductList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
            printQuantity();
            countSumm();
            printFullPrice();

            document.querySelectorAll('.cart-content__product').forEach(el => {
                let id = el.dataset.id;
                document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
            })
        }
    }

    initialState();

    const updateStorege = () => {
        let parent = cartProductList.querySelector('.simplebar-content');
        let html = parent.innerHTML;
        html = html.trim();
        if (html.length) {
            localStorage.setItem('products', html);
        } else {
            localStorage.removeItem('products');
        }
    } 

    document.querySelector('.modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('order-product__delete')) {
            let id = e.target.closest('.order-modal__product').dataset.id;
            let cartProduct = document.querySelector(`.cart-content__product[data-id="${id}"]`).closest('.cart-content__item');
            deleteProducts(cartProduct);
            e.target.closest('.order-modal__product').remove();
        }
    });

    orderModalOpenProd.addEventListener('click', e => {
        if (flag === 0) {
            orderModalOpenProd.classList.add('open');
            orderModalList.style.display = 'block';
            flag = 1;
        } else {
            orderModalOpenProd.classList.remove('open');
            orderModalList.style.display = 'none';
            flag = 0;
        }
    })

    const generateModalProduct = (img, title, price, id) => {
        return `    
            <li class="order-modal__item">
                <article class="order-modal__product order-product" data-id="${id}">
                    <img src="${img}" alt="" class="order-product__img">
                    <div class="order-product__text">
                        <h3 class="order-product__title">${title}</h3>
                        <span class="order-product__price">${normalPrice(price)} грн</span>
                    </div>
                    <button class="order-product__delete">Удалить</button>
                </article>
            </li>
        `
    }

    const modal = new Modal({
        isOpen: () => {
            orderModalList.innerHTML = "";
            productArr = [];
            console.log('opened');
            let array = cartProductList.querySelector('.simplebar-content').children;
            let fullprice = fullPrice.textContent;
            let length = array.length;

            document.querySelector('.order-modal__quantity span').textContent = `${length} шт.`;
            document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
            for (item of array) {
                let img = item.querySelector('.cart-product__img').getAttribute('src');
                let title = item.querySelector('.cart-product__title').textContent;
                let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
                let id = item.querySelector('.cart-product').dataset.id;

                orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));
            
                let obj = {};
                obj.title = title.trim();
                obj.price = priceString;
                productArr.push(obj);    
            } 
            console.log(productArr);      
        },
        isClose: () => {
            console.log('closed');
        }
    });

    document.querySelector('.order').addEventListener('submit', (e) => {
        e.preventDefault();
        let self = e.currentTarget;
        let formData = new FormData();
        let name = self.querySelector('[name="name"]').value;
        let phone = self.querySelector('[name="phone"]').value;
        let email = self.querySelector('[name="email"]').value;
        formData.append('Товары', JSON.stringify(productArr));
        formData.append('Name', name);
        formData.append('Phone', phone);
        formData.append('Email', email);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('отправлено');
                }
            }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        self.reset();
    });
})
