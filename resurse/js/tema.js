window.addEventListener("DOMContentLoaded", function() {
    // Aplică tema salvată în localStorage la încărcarea paginii
    if (localStorage.getItem("tema")) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    // Adaugă evenimentul de clic pentru butonul de schimbare a temei
    document.getElementById("schimba-tema").addEventListener("click", function() {
        // Verifică dacă tema întunecată este deja activată
        if (document.body.classList.contains("dark")) {
            // Dacă da, elimină clasa 'dark' și șterge tema din localStorage
            document.body.classList.remove("dark");
            localStorage.removeItem("tema");
        } else {
            // Dacă nu, adaugă clasa 'dark' și salvează tema în localStorage
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        }
    });
});

