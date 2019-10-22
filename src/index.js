import './style.css';

{
  const showCoffees = async () => {

    const response = await fetch(`./assets/data/coffees.json`);
    const coffees = await response.json();
    console.log(coffees);
  };


  const init = () => {
    showCoffees();
  };

  init();

}
