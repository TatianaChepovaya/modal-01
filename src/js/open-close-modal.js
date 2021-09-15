const closeModalRef = document.querySelectorAll('[data-modal-close]');
const backdropModal = document.querySelector('[data-modal-backdrop]');
// const body = document.querySelector('body');


function getEventsByOptions(country = false, keyword = false, page = false) {
    keyword = keyword ? `&keyword=${keyword}` : '';
    page = page ? `&page=${page}` : '';
    country = country ? `&countryCode=${country}` : '';

    const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*` + keyword + country + page;

    return fetchJSON(url).then(res => getPage(res));
}

function searchCardsLinks() {
  const openModalLinks = document.querySelectorAll('[data-modal-open]');
  if (openModalLinks.length > 0) {
    for (let index = 0; index < openModalLinks.length; index++) {
      const openModalLink = openModalLinks[index];

      openModalLink.addEventListener('click', function (e) {
        const modalName = openModalLink.getAttribute('href').replace('#', '');
        const currentModalLink = document.getElementById(modalName);
        modalOpen(currentModalLink);
        e.preventDefault();

        /* Получение данных о конкретном событии по ID*/
          
        /**/
          const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
          const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
          const breakPoint = 'events.json';

          const itemId = this.id;
        //alert(itemId);
            const eventUrl = `${BASE_URL}events/${itemId}.json?apikey=${API_KEY}`;
            const eventUrlAttr = `${BASE_URL}attractions/${itemId}.json?apikey=${API_KEY}`;
        //      const eventUrlInfo = `${BASE_URL}discovery/${itemId}.json?apikey=${API_KEY}`;
//alert(eventUrl);
//alert(eventUrl);
          // Decode the JSON string into an object
          fetch(eventUrl).then((response) => {
              return response.json().then((data) => {
                  console.log(data);
                  const eventDateValue = data.dates.start.localDate;
                  const eventInfoValue = data.info;
                  const eventPlaceValue = data.dates.start.localDate;
                  const eventPriceStd = data.priceRanges[1].type;
                  const eventPriceVip = data.priceRanges[0].type;
                  console.log(eventInfoValue);
    
              }).catch((err) => {
                  console.log(err);
              })
          });



        /**/
        /**/



      });
      window.addEventListener('keydown', onEscModalClose);
    }
  }
}

function searchCloseBtn() {
  console.log('searchCloseBtn');
  if (closeModalRef.length > 0) {
    for (let index = 0; index < closeModalRef.length; index++) {
      const el = closeModalRef[index];
      el.addEventListener('click', function (e) {
        closeModal(el.closest('.backdrop'));
        e.preventDefault();
      });
    }
  }
}

function modalOpen(currentModalLink) {
  console.log('modal open');
  if (currentModalLink) {
    const modalActive = document.querySelector('.backdrop.open');
    if (modalActive) {
      closeModal(modalActive);
    }
  }
  currentModalLink.classList.add('open');
  currentModalLink.addEventListener('click', function (e) {
    if (!e.target.closest('.modal')) {
      closeModal(e.target.closest('.backdrop'));
    }
  });
  searchCloseBtn();
}

function onEscModalClose(evt) {
  if (evt.code === 'Escape') {
    closeModal(backdropModal);
  }
}

function closeModal(modalActive) {
  modalActive.classList.remove('open');
}

export { searchCardsLinks };

function reply_click(clicked_id)
{
    alert(clicked_id);
}