const tjenester = {
    create_tjenester: function(name, description) {
        let i = 0;
        for(const key in services) {
            const name = services[key].name;
            const price = services[key].price;
            const description = services[key].description_long;

            content = `
            <div class="display-card">
                <h2>${name}</h2>
                <div class="display-subtitle">${price}</div>
                <div class="info-text">${description}</div>
            </div>`
    
            if(i % 2 == 0) {
                document.getElementById("tjenester-left").innerHTML += content;
            } else {
                document.getElementById("tjenester-right").innerHTML += content;
            }
            i++;
        }
    },
}

tjenester.create_tjenester();