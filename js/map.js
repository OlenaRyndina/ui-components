ymaps.ready(init);

let center = [48.8866527839977, 2.34310679732974];

function init() {
    let map = new ymaps.Map('map-test', {
    	center: center,
    	zoom: 16,
        controls: ['routePanelControl']
    });

    let control = map.controls.get('routePanelControl');
    let city = 'Париж';

    control.routePanel.state.set({
        type: 'masstransit',
        fromEnabled: false,
        from: `${city}, Церковь святого Петра`,
        toEnabled: true,
        to: 'Эйфелевая башня'
    });

    let placemark = new ymaps.Placemark(center, {
        balloonContentHeader: 'Хедер балуна',
        balloonContentBody: 'Боди балуна',
        balloonContentFooter: 'Подвал'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -25]
    });

    let placemark1 = new ymaps.Placemark(center, {
        balloonContent: `
            <div class="balloon">
                <div class="balloon__address">г. Париж</div>
                <div class="balloon__contacts">
                    <a href="tel:+3999999999 ">+3999999999 </a>
                </div>
            </div>
        `
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -25]
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

/*    map.geoObjects.add(placemark);
*/    map.geoObjects.add(placemark1);

    placemark1.balloon.open();
}