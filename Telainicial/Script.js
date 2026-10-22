// Estado da Aplicação
let isAdmin = false;
let selectedCarId = null;

// Dados mockados iniciais caso o LocalStorage esteja vazio
const defaultCars = [
    {
        id: 1,
        name: "Lancer HL-T",
        image:"https://instagram.ffln1-1.fna.fbcdn.net/v/t51.82787-15/861668574_18094364705692277_6585833048402907769_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=109&_nc_map=urlgen_bucketless&ig_cache_key=NDAxMjM3MjY3MTk2MTg2NTk2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMzAyNC5oZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=eE2C_Ltus5MQ7kNvwGZNUVd&_nc_oc=AdowF-6B1yweubf1gtr9XCsGbZ8xbhG-fHFJ1dEPaUCaD4sJpFE_PLVLiqmF6ekaUQ-8LrTkHlJgbjhPh_9iEdYW&_nc_zt=23&_nc_ht=instagram.ffln1-1.fna&_nc_gid=V6poPB2wA78H03PvZl_lTg&_nc_ss=7b6a8&oh=00_AQPtPUdTCkBKsxGYiHhA-9vujnEUn16ryEiWVnrMACazDg&oe=6ADF3F5E",
        year: "2019 2.0 / 4B11",
        parts: [
            { id: 101, name: "Aerofolio Modelo Abs Lancer Evolution", image: "https://http2.mlstatic.com/D_NQ_NP_2X_835008-MLB90116600571_082025-F-aerofolio-modelo-plastico-abs-lancer-evo-evolution-2012-2013.webp", storeName: "Mercado Livre", storeLink: "https://produto.mercadolivre.com.br/MLB-4034198895-aerofolio-modelo-plastico-abs-lancer-evo-evolution-2012-2013-_JM?sid=purchases", notes: "Produto entregue em perfeitas condições. Furações exatas e material de ótima qualidade." },
            { id: 102, name: "Escapamento Luzian", image: "https://api.luzianperformanceparts.com/uploads/EUTQUsqpGbbt9wSeRzvdN.png?v=105", storeName: "Luzian Performace Partis", storeLink: "https://luzian.com.br/produto/la06", notes: "Excelente produto! Ronco perfeito, acabamento impecável e o atenuador removível funciona muito bem para reduzir o barulho." },
            { id: 102, name: "Luzes Traseiras De Freio Lancer", image: "https://down-br.img.susercontent.com/file/sg-11134201-7rbki-lno3v19urhf9af@resize_w900_nl.webp", storeName: "Shopee", storeLink: "https://shopee.com.br/Luzes-Traseiras-De-Freio-De-12V-Para-Mitsubishi-Lancer-Evolution-X-Outlander-Refletor-De-Cauda-i.1269119992.26254074717", notes: "Luz de freio em perfeito estado, fácil de instalar e combinou muito, ainda mais por ser sequencial." },
            { id: 102, name: "Adesivo Kit Mitsubishi Lancer Vermelho Refletivo", image: "https://down-br.img.susercontent.com/file/sg-11134201-7rd47-luqu25pab2me05@resize_w900_nl.webp", storeName: "Shopee", storeLink: "https://shopee.com.br/Adesivo-Kit-Mitsubishi-Lancer-Vermelho-Refletivo-7-Pe%C3%A7as-i.1213049832.22992984343", notes: "Adesivos de ótima qualidade e acabamento." }
        ]
    }
];

const defaultCleaning = [
    { id: 201, name: "Cera Líquida Blend Spray", image: "https://www.vonixx.com.br/wp-content/uploads/2023/07/blend_spray-removebg-preview.png", storeName: "Loja Oficial da Vonixx", storeLink: "https://www.vonixx.com.br/produto/blend-spray-wax/" },
    { id: 202, name: "Cera Carnaúba Purificada", image: "https://images.unsplash.com/photo-1607860108855-64c2079ed3f3?auto=format&fit=crop&w=600&q=80", storeName: "Mercado Livre", storeLink: "https://mercadolivre.com.br" }
];

// Carregar dados do localStorage ou usar padrão
let carsData = JSON.parse(localStorage.getItem("my_garage_cars")) || defaultCars;
let cleaningData = JSON.parse(localStorage.getItem("my_garage_cleaning")) || defaultCleaning;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    renderCars();
    renderCleaningProducts();
    if(carsData.length > 0) {
        //selectCar(carsData[0].id);
    }
});

// Alternar Abas
function switchTab(tab) {
    const tabCars = document.getElementById("tab-cars");
    const tabCleaning = document.getElementById("tab-cleaning");
    const secCars = document.getElementById("section-cars");
    const secCleaning = document.getElementById("section-cleaning");

    if(tab === 'cars') {
        tabCars.className = "px-4 py-2 rounded-lg text-sm font-medium transition bg-cyan-500 text-slate-950";
        tabCleaning.className = "px-4 py-2 rounded-lg text-sm font-medium transition text-slate-400 hover:text-white";
        secCars.classList.remove("hidden");
        secCleaning.classList.add("hidden");
    } else {
        tabCleaning.className = "px-4 py-2 rounded-lg text-sm font-medium transition bg-cyan-500 text-slate-950";
        tabCars.className = "px-4 py-2 rounded-lg text-sm font-medium transition text-slate-400 hover:text-white";
        secCleaning.classList.remove("hidden");
        secCars.classList.add("hidden");
    }
}

// Renderizar Carros na Grade
function renderCars() {
    const grid = document.getElementById("cars-grid");
    grid.innerHTML = "";

    if(carsData.length === 0) {
        grid.innerHTML = `<p class="text-slate-500 text-sm col-span-full">Nenhum carro cadastrado ainda.</p>`;
        return;
    }

    carsData.forEach(car => {
        const card = document.createElement("div");
        card.className = "car-card relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer shadow-lg";
        card.onclick = () => selectCarAndScroll(car.id);

        card.innerHTML = `
            <div class="h-56 w-full overflow-hidden relative">
                <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <!-- Overlay ao passar o mouse -->
                <div class="car-overlay absolute inset-0 flex flex-col justify-end p-5">
                    <span class="text-xs text-cyan-400 font-semibold">${car.year || 'Garagem'}</span>
                    <h4 class="text-xl font-bold text-white flex items-center justify-between">
                        ${car.name}
                        <i class="fa-solid fa-arrow-down text-sm text-cyan-400"></i>
                    </h4>
                    <p class="text-xs text-slate-300 mt-1">Clique para ver peças e lojas</p>
                </div>
            </div>
            <div class="p-4 flex justify-between items-center bg-slate-900/90">
                <div>
                    <h3 class="font-bold text-white text-base">${car.name}</h3>
                    <p class="text-xs text-slate-400">${car.parts.length} peça(s) catalogada(s)</p>
                </div>
                ${isAdmin ? `<button onclick="event.stopPropagation(); deleteCar(${car.id})" class="text-red-400 hover:text-red-300 p-2"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Selecionar Carro e rolar para baixo
function selectCarAndScroll(carId) {
    selectCar(carId);
    const container = document.getElementById("car-details-container");
    container.scrollIntoView({ behavior: 'smooth' });
}

function selectCar(carId) {
    selectedCarId = carId;
    const car = carsData.find(c => c.id === carId);
    if(!car) return;

    document.getElementById("car-details-container").classList.remove("hidden");
    document.getElementById("selected-car-title").innerText = car.name;

    renderParts(car.parts);
}

// Renderizar Peças do Carro Selecionado
function renderParts(parts) {
    const grid = document.getElementById("parts-grid");
    grid.innerHTML = "";

    if(parts.length === 0) {
        grid.innerHTML = `<p class="text-slate-500 text-sm col-span-full">Nenhuma peça cadastrada para este carro.</p>`;
        return;
    }

    parts.forEach(part => {
        const card = document.createElement("div");
        card.className = "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-md";
        card.innerHTML = `
            <div>
                <div class="h-48 rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img src="${part.image}" alt="${part.name}" class="w-full h-full object-cover">
                </div>
                <h4 class="font-bold text-white text-base mb-1">${part.name}</h4>
                ${part.notes ? `<p class="text-xs text-slate-400 mb-3">${part.notes}</p>` : ''}
            </div>
            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div class="text-xs">
                    <span class="text-slate-500 block">Onde comprou:</span>
                    <a href="${part.storeLink}" target="_blank" class="text-cyan-400 font-semibold hover:underline flex items-center gap-1 mt-0.5">
                        ${part.storeName} <i class="fa-solid fa-external-link text-[10px]"></i>
                    </a>
                </div>
                ${isAdmin ? `<button onclick="deletePart(${part.id})" class="text-red-400 hover:text-red-300 p-2"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Renderizar Produtos de Limpeza
function renderCleaningProducts() {
    const grid = document.getElementById("cleaning-grid");
    grid.innerHTML = "";

    if(cleaningData.length === 0) {
        grid.innerHTML = `<p class="text-slate-500 text-sm col-span-full">Nenhum produto cadastrado.</p>`;
        return;
    }

    cleaningData.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-md";
        card.innerHTML = `
            <div>
                <div class="h-40 rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <h4 class="font-bold text-white text-base mb-1">${item.name}</h4>
                ${item.notes ? `<p class="text-xs text-slate-400 mb-3">${item.notes}</p>` : ''} <!-- <- Linha adicionada para exibir a observação -->
            </div>
            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div class="text-xs">
                    <span class="text-slate-500 block">Onde comprou:</span>
                    <a href="${item.storeLink}" target="_blank" class="text-cyan-400 font-semibold hover:underline flex items-center gap-1 mt-0.5">
                        ${item.storeName} <i class="fa-solid fa-external-link text-[10px]"></i>
                    </a>
                </div>
                ${isAdmin ? `<button onclick="deleteCleaning(${item.id})" class="text-red-400 hover:text-red-300 p-2"><i class="fa-solid fa-trash"></i></button>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Controle de Autenticação Admin
function toggleAdminModal() {
    if(isAdmin) {
        logoutAdmin();
    } else {
        document.getElementById("password-modal").classList.remove("hidden");
    }
}

function closePasswordModal() {
    document.getElementById("password-modal").classList.add("hidden");
    document.getElementById("admin-password-input").value = "";
}

function verifyPassword() {
    const pass = document.getElementById("admin-password-input").value;
    if(pass === "admin123") {
        isAdmin = true;
        closePasswordModal();
        updateAdminUI();
    } else {
        alert("Senha incorreta!");
    }
}

function logoutAdmin() {
    isAdmin = false;
    updateAdminUI();
}

function updateAdminUI() {
    const adminElements = document.querySelectorAll(".admin-only");
    const banner = document.getElementById("admin-banner");
    const icon = document.getElementById("admin-icon");
    const btnText = document.getElementById("admin-btn-text");

    if(isAdmin) {
        adminElements.forEach(el => el.classList.remove("hidden"));
        banner.classList.remove("hidden");
        icon.className = "fa-solid fa-lock-open text-cyan-400";
        btnText.innerText = "Sair Admin";
    } else {
        adminElements.forEach(el => el.classList.add("hidden"));
        banner.classList.add("hidden");
        icon.className = "fa-solid fa-lock";
        btnText.innerText = "Área Admin";
    }
    renderCars();
    if(selectedCarId) selectCar(selectedCarId);
    renderCleaningProducts();
}

// Modais de Cadastro
function openCarModal() { document.getElementById("car-modal").classList.remove("hidden"); }
function closeCarModal() { document.getElementById("car-modal").classList.add("hidden"); }

function openPartModal() { document.getElementById("part-modal").classList.remove("hidden"); }
function closePartModal() { document.getElementById("part-modal").classList.add("hidden"); }

function openCleaningModal() { document.getElementById("cleaning-modal").classList.remove("hidden"); }
function closeCleaningModal() { document.getElementById("cleaning-modal").classList.add("hidden"); }

// Salvar / Deletar dados
function saveCar() {
    const name = document.getElementById("car-name").value;
    const image = document.getElementById("car-image").value;
    const year = document.getElementById("car-year").value;

    if(!name || !image) {
        alert("Preencha o nome e o link da foto do carro.");
        return;
    }

    const newCar = { id: Date.now(), name, image, year, parts: [] };
    carsData.push(newCar);
    localStorage.setItem("my_garage_cars", JSON.stringify(carsData));
    closeCarModal();
    renderCars();
    selectCarAndScroll(newCar.id);
}

function deleteCar(id) {
    if(confirm("Deseja realmente excluir este carro e suas peças?")) {
        carsData = carsData.filter(c => c.id !== id);
        localStorage.setItem("my_garage_cars", JSON.stringify(carsData));
        renderCars();
        if(carsData.length > 0) selectCar(carsData[0].id);
        else document.getElementById("car-details-container").classList.add("hidden");
    }
}

function savePart() {
    const name = document.getElementById("part-name").value;
    const image = document.getElementById("part-image").value;
    const storeName = document.getElementById("part-store-name").value;
    const storeLink = document.getElementById("part-store-link").value;
    const notes = document.getElementById("part-notes").value;

    if(!name || !image || !storeName || !storeLink) {
        alert("Preencha os campos obrigatórios da peça.");
        return;
    }

    const car = carsData.find(c => c.id === selectedCarId);
    if(car) {
        car.parts.push({ id: Date.now(), name, image, storeName, storeLink, notes });
        localStorage.setItem("my_garage_cars", JSON.stringify(carsData));
        closePartModal();
        selectCar(selectedCarId);
        renderCars();
    }
}

function deletePart(partId) {
    const car = carsData.find(c => c.id === selectedCarId);
    if(car) {
        car.parts = car.parts.filter(p => p.id !== partId);
        localStorage.setItem("my_garage_cars", JSON.stringify(carsData));
        selectCar(selectedCarId);
        renderCars();
    }
}

function saveCleaningProduct() {
    const name = document.getElementById("clean-name").value;
    const image = document.getElementById("clean-image").value;
    const storeName = document.getElementById("clean-store-name").value;
    const storeLink = document.getElementById("clean-store-link").value;
    const notes = document.getElementById("clean-notes").value; // <- Adicionado aqui

    if(!name || !image || !storeName || !storeLink) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    cleaningData.push({ id: Date.now(), name, image, storeName, storeLink, notes }); // <- Salvando notes
    localStorage.setItem("my_garage_cleaning", JSON.stringify(cleaningData));
    closeCleaningModal();
    }

function deleteCleaning(id) {
    if(confirm("Deseja excluir este produto?")) {
        cleaningData = cleaningData.filter(item => item.id !== id);
        localStorage.setItem("my_garage_cleaning", JSON.stringify(cleaningData));
        renderCleaningProducts();
    }
}
