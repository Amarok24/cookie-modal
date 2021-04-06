/*
Cookie modal.

A simple TypeScript solution which shows a cookie consent box, currently implementing Google Tag Manager.

Copyright 2021 Jan Prazak, https://github.com/Amarok24/cookie-modal

License: The Unlicense.
*/

const overlay: HTMLElement | null = document.querySelector<HTMLElement>(".cookie-modal-wrap");
const modalBox: HTMLElement | null = document.querySelector<HTMLElement>(".cookie-modal");
const buttonAccept: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".cookie-modal button");

const uniqueStorageId = "cookieConsentUser111";
// localStorage could be used for more permanent solution
const prevUserSelection: string | null = sessionStorage.getItem(uniqueStorageId);

const GTM_ID = "GTM-0000000"; // EDIT THIS Google Tag Manager ID


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

	sessionStorage.setItem(uniqueStorageId, "x");
	setCookie();
}


function setEventListeners()
{
	buttonAccept?.addEventListener("click", onAccept);
}


document.addEventListener("DOMContentLoaded", () =>
{
	if (prevUserSelection)
	{
		console.log("Cookies already accepted.");
		return;
	}

	setOverlayVisibility();
	setTimeout(setModalFadeIn, 500);
	setEventListeners();
});
