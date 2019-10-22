{
  const fetchJSON = () => {
    fetch('../src/assets/data/coffees.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Work with JSON data here
        //load prices function, the number is how many we want to load
        loadPrices(data, 5);
      })
      .catch(err => {});
  };

  const loadPrices = (data, count) => {
  //For every item a element gets created filled in and appended to the parent
    for (let i = 0;i <= count - 1;i ++) {
      const $li = document.createElement(`li`);

      $li.classList.add(`price`);
      $li.setAttribute('data-id', i);
      const $list = document.querySelector(`.prices__list`);

      $li.innerHTML = `<a class="price__button" onclick="addOrder(event)" data-id=${i}">
      <span class="price__button__wrapper">
        <span class="price__button__name">${data['coffees'][i]['name']}</span>
        <span class="price__button__amount">&euro; ${data['coffees'][i]['prices']['medium']}</span>
      </span>
      <span class="price__button__plus">+</span>
      </a>`;
      $list.appendChild($li);
    }
  };

  const init = () => {
    fetchJSON();
  };

  init();

}
