export default function site () {
  const $mobileBurgerButton = document.querySelector('.mobile-burger-button');
  const $navMobile = document.querySelector('.nav-mobile');
	let init = function () {
		hookEvents();
	}

	const hookEvents = function () {
    handleMobileBurgerButton();
  }

  const handleMobileBurgerButton = function () {
    
    $mobileBurgerButton.addEventListener("click", () => {
      $navMobile.classList.toggle('d-block');
      $navMobile.classList.toggle('d-none');
    });

  }

  return {
    init : init 
  }
}

