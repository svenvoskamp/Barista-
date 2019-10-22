{

  const fetchJSON = () => {
    fetch('../src/assets/data/coffees.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);

        const coffees = data.coffees.filter(function(coffee) {
          return coffee.plantbased;
        });
        console.log(coffees);
        loadPrices(coffees, 5);
      })
      .catch(err => {});
  };

  const loadPrices = (coffees, count) => {
    for (let i = 0;i <= count - 1;i ++) {
      const $li = document.createElement(`li`);

      $li.classList.add(`price`);
      $li.setAttribute('data-id', i);
      const $list = document.querySelector(`.prices__list`);

      $li.innerHTML = `<a class="price__button" data-id=${i}>
      <span class="price__button__wrapper">
        <span class="price__button__name">${coffees[i]['name']}</span>
        <span class="price__button__amount">&euro; ${coffees[i]['prices']['medium']}</span>
      </span>
      <span class="price__button__plus">+</span>
      </a>`;
      $list.appendChild($li);
      const buttons = document.querySelectorAll(`.price__button__plus`);
      buttons.forEach($click => $click.addEventListener('click', handleClickEvent));
    }
  };

  const orders = [];

  const handleClickEvent = e => {
    const $child = e.currentTarget;
    const $parent = $child.parentElement;
    const $sibling = $parent.firstElementChild;
    const $buttonName = $sibling.firstElementChild;
    const $priceChar = $buttonName.nextElementSibling.textContent;

    const $name = $buttonName.textContent;
    const $price = $priceChar.slice(2);
    const $id = $parent.dataset.id;
    console.log($id);
    console.log($name);
    console.log($price);

  };





  const init = () => {
    fetchJSON();

  };

  init();

}
