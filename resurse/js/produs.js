document.addEventListener("DOMContentLoaded", function() {
    const buttonAccordion = document.querySelector(".accordion-button");
    const collapseOne = document.getElementById("collapseOne");
    const productId = document.getElementById("id").textContent.trim();

    console.log("Button accordion:", buttonAccordion);
    console.log("Collapse one:", collapseOne);
    console.log("Product ID:", productId);

    if (buttonAccordion && collapseOne && productId) {
        if (getCookie(productId)) {
            buttonAccordion.setAttribute("aria-expanded", "true");
            buttonAccordion.classList.remove("collapsed");
            collapseOne.classList.add("show");
        }

        buttonAccordion.onclick = function() {
            if (getCookie(productId)) {
                deleteCookie(productId);
            } else {
                setCookie(productId, true, 600000);
            }
        }
    } else {
        console.error("One or more elements not found:", { buttonAccordion, collapseOne, productId });
    }
});
