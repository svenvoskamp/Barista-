{
  const $orders = [];

  if (typeof $orders == 'undefined' || $orders.length <= 0) {
    const $orderList = document.querySelector('.orders');
      const $div = document.createElement(`div`);
      $div.classList.add(`emptystate`);
      $div.innerHTML =`
      <img srcset="./assets/img/coffee-maker.jpg 67w,
        ./assets/img/coffee-maker@2x.jpg 134w" sizes="67px" src="./assets/img/coffee-maker.jpg" alt="A coffee maker">

      <span class="emptystate__content">
        Please order something
        <span role="img" aria-label="Drunk emoji">
          🤪
        </span>
      </span>
    `;
    $orderList.appendChild($div);
  }

  const fetchJSON = () => {
    fetch('../src/assets/data/coffees.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const coffees = data.coffees.filter(function(coffee) {
          return coffee.plantbased;
        });
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

  const handleClickEvent = e => {
    const $child = e.currentTarget;
    const $parent = $child.parentElement;
    const $sibling = $parent.firstElementChild;
    const $buttonName = $sibling.firstElementChild;
    const $priceChar = $buttonName.nextElementSibling.textContent;


    const $name = $buttonName.textContent;
    const $price = $priceChar.slice(2);
    const $id = $parent.dataset.id;

    loadOrders($id, $price, $name);

  };

    const loadOrders = ($id, $price, $name) => {

        function searchId($orders) {
          return $orders.id === $id;
        };
        if ($orders.find(searchId)) {
          const $obj = $orders.find(searchId);
            $obj.amount = $obj.amount + 1;
            makeOrders();
          } else {
            console.log('nieuwe aanmaken!');
            addArray($id, $name, $price);
            makeOrders();
        }
      };


  const addArray = ($id, $name, $price) => {
    $orders.push(
      ({
        id: $id,
        name: $name,
        price: $price,
        amount: 1
      })
    );
  };


  const makeOrders = () => {
    const $orderList = document.querySelector('.orders');
    $orderList.innerHTML = '';

    $orders.forEach(order => {
      const $li = document.createElement(`li`);
      $li.classList.add(`order`);
      $li.innerHTML = `
      <span class="order__name">
        <span class="order__amount">${order.amount}x</span> ${order.name}
      </span>
      <span class="order__price">
      &euro; ${order.price * order.amount}
      </span>
      <button class="remove" data-id=${order.id}>
        x
      </button>`;

      $orderList.appendChild($li);
      const removes = document.querySelectorAll(`.remove`);
      removes.forEach($delete => $delete.addEventListener('click', handleClickRemove));
      console.log($orders);
    });

  };

  const handleClickRemove = e => {
    console.log('je wilt wat verwijderen');
    const $child = e.currentTarget;
    const $id = $child.dataset.id;

    function searchRemove($orders) {
      return $orders.id === $id;
    };
    function getIndex($orders) {
      return $orders.id === $id;
    }

    if ($orders.find(searchRemove)) {
      const $index = $orders.findIndex(getIndex);
      console.log($index);
      $orders.splice($index, 1);
      makeOrders();
    }
  };





  const init = () => {
    fetchJSON();

  };

  init();

}
