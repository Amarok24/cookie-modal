"use strict";
const overlay = document.querySelector(".cookie-modal-wrap");
const modalBox = document.querySelector(".cookie-modal");
const buttonAccept = document.querySelector(".cookie-modal button");
const uniqueStorageId = "cookieConsentUser111";
const prevUserSelection = sessionStorage.getItem(uniqueStorageId);
const GTM_ID = "GTM-0000000";
function injectGTMCode(id) {
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
function setCookie() {
    injectGTMCode(GTM_ID);
}
function removeChildrenOf(element) {
    while (element.lastElementChild) {
        let last = element.lastElementChild;
        element.removeChild(last);
    }
}
function setOverlayVisibility(show = true) {
    console.log("Cookie modal overlay", show);
    if (overlay && show)
        overlay.classList.add("active-overlay");
    if (overlay && !show)
        overlay.classList.remove("active-overlay");
}
function setModalFadeIn(show = true) {
    console.log("Cookie modal box", show);
    if (modalBox && show)
        modalBox.classList.add("startFadeIn");
    if (modalBox && !show)
        modalBox.classList.remove("startFadeIn");
}
function onAccept() {
    if (overlay) {
        overlay.style.display = "none";
        removeChildrenOf(overlay);
    }
    console.log("Cookies accepted");
    sessionStorage.setItem(uniqueStorageId, "x");
    setCookie();
}
function setEventListeners() {
    buttonAccept?.addEventListener("click", onAccept);
}
document.addEventListener("DOMContentLoaded", () => {
    if (prevUserSelection) {
        console.log("Cookies already accepted.");
        return;
    }
    setOverlayVisibility();
    setTimeout(setModalFadeIn, 500);
    setEventListeners();
});
