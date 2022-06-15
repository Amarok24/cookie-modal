/*
Cookie modal.

A simple TypeScript solution which shows a cookie consent box, currently implementing Google Tag Manager.

Copyright 2021-2022 Jan Prazak, https://github.com/Amarok24/cookie-modal

License: The Unlicense.
*/

const overlay: HTMLElement | null = document.querySelector(".cookie-modal-wrap");
const modalBox: HTMLElement | null = document.querySelector(".cookie-modal");
const buttonAccept: HTMLButtonElement | null = document.querySelector(".cookie-modal .cookie-accept");
const buttonDecline: HTMLButtonElement | null = document.querySelector(".cookie-modal .cookie-decline");

const uniqueStorageId: string = "cookieConsentUser111";
const prevUserSelection: string | null = sessionStorage.getItem(uniqueStorageId);
// localStorage could be used for more permanent solution

const GTM_ID = "GTM-XXXXXXX"; // EDIT THIS Google Tag Manager ID


function injectGTMCode(id: string)
{
  const script = document.createElement("script");
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js"
  });

  script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=" + id;

  document.head.append(script);
}


function setCookie()
{
  injectGTMCode(GTM_ID);
}

/**
 *	Removes all Element children of given HTMLElement.
 *	Leaves non-Element Nodes as children (for example text comments).
 *	(Note: just setting innerHTML to an empty string is bad and insecure.)
 */
function removeChildrenOf(element: HTMLElement): void
{
  while (element.lastElementChild)
  {
    let last: Element = element.lastElementChild;
    element.removeChild(last);
  }
}


function setOverlayVisibility(show: boolean = true)
{
  console.log("Cookie modal overlay", show);

  if (overlay && show) overlay.classList.add("active-overlay");
  if (overlay && !show) overlay.classList.remove("active-overlay");
}


function setModalFadeIn(show: boolean = true)
{
  console.log("Cookie modal box", show);

  if (modalBox && show) modalBox.classList.add("startFadeIn");
  if (modalBox && !show) modalBox.classList.remove("startFadeIn");
}



function onAccept()
{
  if (overlay)
  {
    overlay.style.display = "none";
    removeChildrenOf(overlay);
  }

  console.log("Cookies accepted");

  sessionStorage.setItem(uniqueStorageId, "y");
  setCookie();
}

function onDecline(ev: Event)
{
  ev.preventDefault();

  if (overlay)
  {
    overlay.style.display = "none";
    removeChildrenOf(overlay);
  }

  console.log("Cookies declined");

  sessionStorage.setItem(uniqueStorageId, "n");
}


function setEventListeners()
{
  buttonAccept?.addEventListener("click", onAccept);
  buttonDecline?.addEventListener("click", onDecline);
}


document.addEventListener("DOMContentLoaded", () =>
{
  if (prevUserSelection)
  {
    console.log("Cookies already accepted or declined.");
    if (prevUserSelection === 'y') setCookie();
    return;
  }

  setOverlayVisibility();
  setTimeout(setModalFadeIn, 500);
  setEventListeners();
});
