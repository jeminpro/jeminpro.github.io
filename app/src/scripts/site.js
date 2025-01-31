export default function site() {
  const $mobileBurgerButton = document.querySelector('.mobile-burger-button');
  const $navMobile = document.querySelector('.nav-mobile');

  const $taglist = document.querySelector(".tags-list");
  const $tagLeftArrow = document.querySelector(".arrow-left");
  const $tagRightArrow = document.querySelector(".arrow-right");

  const init = () =>{
    hookEvents();
    footerTyping();
  }

  const hookEvents = () => {
    handleMobileBurgerButton();
    tagsEvents();
  }

  const handleMobileBurgerButton = () => {
    $mobileBurgerButton.addEventListener("click", () => {
      $navMobile.classList.toggle('d-block');
      $navMobile.classList.toggle('d-none');
    });
  }

  const tagsEvents = () => {
    $tagLeftArrow.addEventListener("click", () => {
      $taglist.scrollBy({ left: -200, behavior: "smooth" });
    });

    $tagRightArrow.addEventListener("click", () => {
      $taglist.scrollBy({ left: 200, behavior: "smooth" });
    });
    
    $taglist.addEventListener("scroll", updateTagArrows);
    window.addEventListener("load", updateTagArrows);
  }
  
  const updateTagArrows = () => {
    const maxScrollLeft = $taglist.scrollWidth - $taglist.clientWidth - 5;

    if ($taglist.scrollLeft > 0) {
      $tagLeftArrow.classList.remove("display-none");
    } else {
      $tagLeftArrow.classList.add("display-none");
    }

    if ($taglist.scrollLeft < maxScrollLeft) {
      $tagRightArrow.classList.remove("display-none");
    } else {
      $tagRightArrow.classList.add("display-none");
    }
  };

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

