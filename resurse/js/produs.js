document.addEventListener("DOMContentLoaded", function() {
    const accordions = document.querySelectorAll(".accordion-button");
    const accordionStates = JSON.parse(localStorage.getItem("accordionStates")) || {};

    function saveAccordionState(id, isOpen) {
        accordionStates[id] = isOpen;
        localStorage.setItem("accordionStates", JSON.stringify(accordionStates));
    }

    function restoreAccordionStates() {
        accordions.forEach(accordion => {
            const collapse = document.getElementById(accordion.getAttribute("aria-controls"));
            const id = collapse.id;
            if (accordionStates[id]) {
                accordion.setAttribute("aria-expanded", "true");
                accordion.classList.remove("collapsed");
                collapse.classList.add("show");
            } else {
                accordion.setAttribute("aria-expanded", "false");
                accordion.classList.add("collapsed");
                collapse.classList.remove("show");
            }
        });
    }

    accordions.forEach(accordion => {
        const collapse = document.getElementById(accordion.getAttribute("aria-controls"));
        accordion.onclick = function() {
            const isOpen = !accordion.classList.contains("collapsed");
            saveAccordionState(collapse.id, isOpen);
        }
    });

    restoreAccordionStates();
});

