window.onload = function () {
    const comunidadSelect = document.getElementById("ccaa");
    const provinciaSelect = document.getElementById("provincia");
    const poblacionSelect = document.getElementById("poblacion");
    const form = document.querySelector("form");
    const imageContainer = document.getElementById("image-container");
    const localStorageToggle = document.getElementById("localStorageToggle");


    fetch("https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/ccaa.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(comunidad => {
                let option = document.createElement("option");
                option.value = comunidad.code;
                option.textContent = comunidad.label;
                comunidadSelect.appendChild(option);
            });
            restoreSelection();
        })
        .catch(error => console.error("Error loading Autonomous Communities:", error));

    comunidadSelect.addEventListener("change", () => {
        saveSelection();
        loadProvincias(comunidadSelect.value);
    });

    function loadProvincias(comunidadCode, savedProvincia = null) {
        provinciaSelect.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';
        poblacionSelect.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';

        fetch("https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/provincias.json")
            .then(response => response.json())
            .then(data => {
                let provincias = data.filter(prov => prov.parent_code === comunidadCode);
                provincias.forEach(provincia => {
                    let option = document.createElement("option");
                    option.value = provincia.code;
                    option.textContent = provincia.label;
                    provinciaSelect.appendChild(option);
                });
                if (savedProvincia) provinciaSelect.value = savedProvincia;
            })
            .catch(error => console.error("Error loading Provinces:", error));
    }

    provinciaSelect.addEventListener("change", () => {
        saveSelection();
        loadPoblaciones(provinciaSelect.value);
    });

    function loadPoblaciones(provinciaCode, savedPoblacion = null) {
        poblacionSelect.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';

        fetch("https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json")
            .then(response => response.json())
            .then(data => {
                let poblaciones = data.filter(pobl => pobl.parent_code === provinciaCode);
                poblaciones.forEach(poblacion => {
                    let option = document.createElement("option");
                    option.value = poblacion.label;
                    option.textContent = poblacion.label;
                    poblacionSelect.appendChild(option);
                });
                if (savedPoblacion) poblacionSelect.value = savedPoblacion;
            })
            .catch(error => console.error("Error loading Towns:", error));
    }

    poblacionSelect.addEventListener("change", saveSelection);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        imageContainer.innerHTML = "";

        const selectedPoblacion = poblacionSelect.value;
        if (!selectedPoblacion) return alert("Selecciona una població.");

        const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=${encodeURIComponent(selectedPoblacion)}&gimlimit=10&prop=imageinfo&iiprop=url`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.query) {
                    imageContainer.innerHTML = "<p>No s'han trobat imatges.</p>";
                    return;
                }
                const images = Object.values(data.query.pages);
                images.forEach(image => {
                    const imageBox = createImageElement(image.imageinfo[0].url);
                    imageContainer.appendChild(imageBox);
                });
            })
            .catch(error => {
                console.error("Error obtenint imatges:", error);
                imageContainer.innerHTML = "<p>Error carregant les imatges.</p>";
            });
    });

    // ------------------------------------ LocalStorage API---------------------------------------------------------- 
    let isLocalStorageEnabled = localStorageToggle.checked;
    
    function saveSelection() {
        if (isLocalStorageEnabled) {
            localStorage.setItem("comunidad", comunidadSelect.value);
            localStorage.setItem("provincia", provinciaSelect.value);
            localStorage.setItem("poblacion", poblacionSelect.value);
        }
    }

    function restoreSelection() {
        if (isLocalStorageEnabled) {
            const savedComunidad = localStorage.getItem("comunidad");
            const savedProvincia = localStorage.getItem("provincia");
            const savedPoblacion = localStorage.getItem("poblacion");

            if (savedComunidad) comunidadSelect.value = savedComunidad;
            if (savedProvincia) loadProvincias(savedComunidad, savedProvincia);
            if (savedPoblacion) loadPoblaciones(savedProvincia, savedPoblacion);
        }
    }

    localStorageToggle.addEventListener("change", () => {
        isLocalStorageEnabled = localStorageToggle.checked;
        if (isLocalStorageEnabled) {
            restoreSelection();
        }
    });

    // ------------------------------------ WakeLock API  ----------------------------------------------------------
    let wakeLock = null;

    async function requestWakeLock() {
        if ('wakeLock' in navigator) {
            try {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log("Wake Lock activado");
            } catch (err) {
                console.error("Error activando Wake Lock:", err);
            }
        }
    }

    function releaseWakeLock() {
        if (wakeLock) {
            wakeLock.release();
            wakeLock = null;
            console.log("Wake Lock liberado");
        }
    }

    function toggleFullScreen(imgElement) {
        if (!document.fullscreenElement) {
            imgElement.requestFullscreen().then(requestWakeLock);
        } else {
            document.exitFullscreen();
        }
    }

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            releaseWakeLock();
        }
    });

    function createImageElement(imageUrl) {
        const imageBox = document.createElement("div");
        imageBox.classList.add("image-box");

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Imagen de la población";
        imgElement.addEventListener("click", () => toggleFullScreen(imgElement));

        imageBox.appendChild(imgElement);
        return imageBox;
    }

    // ------------------------------------ Acordeón  ----------------------------------------------------------
    var acordeones = document.getElementsByClassName("accordion");

    for (let i = 0; i < acordeones.length; i++) {
        acordeones[i].addEventListener("click", function () {
            this.classList.toggle("active");
    
            var panel = this.nextElementSibling;
    
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
    
};
