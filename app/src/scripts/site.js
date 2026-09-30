export default function site() {
  const $mobileBurgerButton = document.querySelector('.mobile-burger-button');
  const $navMobile = document.querySelector('.nav-mobile');

  const $taglist = document.querySelector(".tags-list");
  const $tagLeftArrow = document.querySelector(".arrow-left");
  const $tagRightArrow = document.querySelector(".arrow-right");

  const init = () =>{
    hookEvents();
    footerTyping();
    externalLiksNewTab();
    setupModals();
    setupTaskLists();
    setupExerciseLinks();
    setupSearch();
    setupToc();
  }

  const hookEvents = () => {
    handleMobileBurgerButton();
    tagsArrowScroll();
  }

  const handleMobileBurgerButton = () => {
    $mobileBurgerButton.addEventListener("click", () => {
      $navMobile.classList.toggle('d-block');
      $navMobile.classList.toggle('d-none');
    });
  }

  const tagsArrowScroll = () => {
    if($taglist === null) return;

    $tagLeftArrow.addEventListener("click", () => {
      $taglist.scrollBy({ left: -200, behavior: "smooth" });
    });

    $tagRightArrow.addEventListener("click", () => {
      $taglist.scrollBy({ left: 200, behavior: "smooth" });
    });
    
    const arrowVisability = () => {
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

    $taglist.addEventListener("scroll", arrowVisability);
    window.addEventListener("load", arrowVisability);
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

  const setupModals = () => {
    const supportsInvoker = "commandForElement" in HTMLButtonElement.prototype;
    const dialogs = document.querySelectorAll(".content dialog");

    dialogs.forEach((dialog, index) => {
      if (!dialog.id) {
        dialog.id = `md-modal-${index + 1}`;
      }

      if (!dialog.querySelector(":scope > .md-modal-close") && !dialog.querySelector(".md-modal-close")) {
        const close = document.createElement("button");
        close.type = "button";
        close.className = "md-modal-close";
        close.setAttribute("commandfor", dialog.id);
        close.setAttribute("command", "close");
        close.setAttribute("aria-label", "Close");
        close.textContent = "×";
        dialog.prepend(close);
      }

      if (!dialog.querySelector(":scope > .md-modal-panel")) {
        const panel = document.createElement("div");
        panel.className = "md-modal-panel";
        while (dialog.firstChild) panel.append(dialog.firstChild);
        dialog.append(panel);
      }

      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    });

    if (supportsInvoker) return;

    document.querySelectorAll(".content button[commandfor]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("commandfor"));
        if (!(target instanceof HTMLDialogElement)) return;

        const command = button.getAttribute("command");
        if (command === "show-modal" && !target.open) target.showModal();
        if (command === "close") target.close();
      });
    });
  }

  const setupTaskLists = () => {
    document.querySelectorAll(".content .task-list-item input[type='checkbox']").forEach((box) => {
      box.disabled = false;
    });
  }

  const setupExerciseLinks = () => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (!isAndroid && !isIOS) return;

    document.querySelectorAll(".content a.exercise-yt").forEach((link) => {
      link.addEventListener("click", (event) => {
        const url = new URL(link.href);
        const videoId = url.searchParams.get("v");
        const search = url.searchParams.get("search_query");
        const web = link.href;
        event.preventDefault();

        if (isAndroid) {
          const path = videoId
            ? `www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
            : `www.youtube.com/results?search_query=${encodeURIComponent(search || "")}`;
          window.location.href = `intent://${path}#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${encodeURIComponent(web)};end`;
          return;
        }

        const appUrl = videoId
          ? `youtube://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
          : `youtube://www.youtube.com/results?search_query=${encodeURIComponent(search || "")}`;
        const opener = document.createElement("a");
        opener.href = appUrl;
        opener.target = "_blank";
        opener.rel = "noopener noreferrer";
        opener.hidden = true;
        document.body.append(opener);
        opener.click();
        opener.remove();
      });
    });
  }

  const setupSearch = () => {
    const root = document.querySelector("[data-site-search]");
    const openButton = document.querySelector("[data-search-open]");
    if (!root || !openButton) return;

    const input = root.querySelector("input");
    const results = root.querySelector("[data-search-results]");
    const hint = root.querySelector("[data-search-hint]");
    const closeButton = root.querySelector("[data-search-close]");

    let indexPromise = null;

    const loadIndex = () => {
      if (!indexPromise) {
        indexPromise = fetch("/search-index.json").then((response) => {
          if (!response.ok) throw new Error("Search index failed");
          return response.json();
        });
      }
      return indexPromise;
    };

    const hideResults = () => {
      root.dataset.searchToken = String(Number(root.dataset.searchToken || 0) + 1);
      results.hidden = true;
      results.replaceChildren();
      hint.hidden = false;
    };

    const renderResults = (results, matches) => {
      results.replaceChildren();

      if (!matches.length) {
        const empty = document.createElement("p");
        empty.className = "search-empty";
        empty.textContent = "No matches";
        results.append(empty);
        hint.hidden = true;
        results.hidden = false;
        return;
      }

      matches.forEach((match) => {
        const group = document.createElement("div");
        group.className = "search-group";

        const type = document.createElement("span");
        type.className = "search-type";
        type.textContent = match.item.type === "article" ? "Article" : "Snippet";
        group.append(type);

        if (match.titleMatch) {
          const titleLink = document.createElement("a");
          titleLink.href = match.item.url;
          titleLink.textContent = match.item.title;
          group.append(titleLink);
        } else {
          const title = document.createElement("span");
          title.className = "search-page";
          title.textContent = match.item.title;
          group.append(title);
        }

        if (match.headingMatches.length) {
          const list = document.createElement("ul");
          list.className = "search-headings";
          match.headingMatches.forEach((heading) => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = `${match.item.url}#${heading.slug}`;
            link.textContent = heading.text;
            item.append(link);
            list.append(item);
          });
          group.append(list);
        }

        results.append(group);
      });

      hint.hidden = true;
      results.hidden = false;
    };

    const search = async () => {
      const query = input.value.trim().toLowerCase();
      const token = String(Number(root.dataset.searchToken || 0) + 1);
      root.dataset.searchToken = token;
      if (!query) {
        hideResults();
        return;
      }

      let index;
      try {
        index = await loadIndex();
      } catch {
        if (root.dataset.searchToken !== token) return;
        results.replaceChildren();
        const empty = document.createElement("p");
        empty.className = "search-empty";
        empty.textContent = "Search is unavailable";
        results.append(empty);
        hint.hidden = true;
        results.hidden = false;
        return;
      }

      if (root.dataset.searchToken !== token) return;
      if (input.value.trim().toLowerCase() !== query) return;

      const matches = index.flatMap((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const headingMatches = item.headings.filter((heading) =>
          heading.text.toLowerCase().includes(query)
        );
        if (!titleMatch && !headingMatches.length) return [];
        return [{ item, titleMatch, headingMatches }];
      });

      renderResults(results, matches);
    };

    const openSearch = () => {
      root.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("search-locked");
      input.focus();
    };

    const closeSearch = () => {
      hideResults();
      input.value = "";
      root.hidden = true;
      openButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("search-locked");
      openButton.focus();
    };

    openButton.addEventListener("click", openSearch);
    closeButton.addEventListener("click", closeSearch);
    input.addEventListener("input", search);

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || root.hidden) return;
      closeSearch();
    });
  }

  const setupToc = () => {
    const toc = document.querySelector(".toc");
    if (!toc) return;

    const headingEls = [...document.querySelectorAll(".toc-root a")].reduce((headings, link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      if (headings.some((heading) => heading.id === id)) return headings;
      const el = document.getElementById(id);
      if (el) headings.push(el);
      return headings;
    }, []);

    if (!headingEls.length) return;

    let activeId = "";
    let frame = 0;

    const revealInSideToc = (id) => {
      const side = document.querySelector(".toc-side");
      if (!side || side.offsetParent === null || side.scrollHeight <= side.clientHeight) return;
      const link = side.querySelector(`a[href="#${CSS.escape(id)}"]`);
      if (!link) return;

      const sideRect = side.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      if (linkRect.top < sideRect.top + 8) {
        side.scrollTop -= sideRect.top + 8 - linkRect.top;
      } else if (linkRect.bottom > sideRect.bottom - 8) {
        side.scrollTop += linkRect.bottom - (sideRect.bottom - 8);
      }
    };

    const setActive = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let current = headingEls[0];

      if (nearBottom) {
        current = headingEls[headingEls.length - 1];
      } else {
        for (const heading of headingEls) {
          if (heading.getBoundingClientRect().top <= 120) current = heading;
        }
      }

      if (current.id === activeId) return;
      activeId = current.id;

      document.querySelectorAll(".toc a").forEach((link) => {
        const active = link.getAttribute("href") === `#${current.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      revealInSideToc(current.id);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(setActive);
    };

    setActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    window.addEventListener("load", onScroll);
  }

  const externalLiksNewTab = () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
      }
    });
  }

  return {
    init: init
  }
}

