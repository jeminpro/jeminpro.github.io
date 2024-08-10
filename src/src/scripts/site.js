export default function site() {
  const $mobileBurgerButton = document.querySelector('.mobile-burger-button');
  const $navMobile = document.querySelector('.nav-mobile');
  let init = function () {
    hookEvents();
    footerTyping();
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

  const footerTyping = () => {
    const wordSpanElement = document.querySelector(".typing-container span");
    
    var wordsToType = wordSpanElement.dataset.words.split(','),
      typer = wordSpanElement,
      typingSpeed = (parseInt(typer.getAttribute('typing-speed')) || 70),
      typingDelay = (parseInt(typer.getAttribute('typing-delay')) || 700);

    var currentWordIndex = 0, currentCharacterIndex = 0;

    const type = () => {
      var wordToType = wordsToType[currentWordIndex % wordsToType.length];
      if (currentCharacterIndex < wordToType.length) {
        typer.innerHTML += wordToType[currentCharacterIndex++];
        setTimeout(type, typingSpeed);
      } else {

        setTimeout(erase, typingDelay);
      }
    }

    const erase = () => {
      var wordToType = wordsToType[currentWordIndex % wordsToType.length];
      if (currentCharacterIndex > 0) {
        typer.innerHTML = wordToType.substr(0, --currentCharacterIndex - 1);
        setTimeout(erase, typingSpeed);
      } else {
        currentWordIndex++;
        setTimeout(type, typingDelay);
      }
    }

    type();
  }

  return {
    init: init
  }
}

