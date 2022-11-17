const bestill = {
    new_table_row: function(index) {
        let attachments = "";
        for (let i = 0; i < candidates[index].attachments.length; i++) {
            let characterLimit = 20;
            let fileName = candidates[index].attachments[i].name;
            if (fileName.length > 20) {
                fileName = fileName.substring(0, characterLimit - 3) + "...";
            }
            attachments += `${fileName}<ins class="highlighted-underlined" onclick="removeFileFromCandidate(${index},${i})">Slett</ins>`;
        }

        let servicesString= "";
        for (let i = 0; i < candidates[index].services.length; i++) {
            servicesString += candidates[index].services[i] + "<br />";
        }
        
        fileInputID = `file-input-${index}`;

        element = document.getElementById("kandidat-table");
        content = `
        <div id="kandidat-table-cell-0-${index}" class="order-table-content">
            <input class="kandidat-name-input" id="kandidat-name-input-${index}" type="text" oninput="bestill.onchange_name(${index})" value="${candidates[index].name}" placeholder="Skriv inn navn"/>
        </div>
        <textarea id="kandidat-table-cell-1-${index}" oninput="bestill.onchange_info(${index})" class="kandidat-info-input order-table-content" type="text" placeholder="Skriv inn ytterlig informasjon">${candidates[index].information}</textarea>
        <div id="kandidat-table-cell-2-${index}" class="order-table-content">
            <div class="upload-document-grid">
                ${attachments}
            </div>
            <label for="${fileInputID}-${index}">
                Last opp dokument
                <input id="${fileInputID}-${index}" type="file" multiple/>
            </label>
        </div>
        <div id="kandidat-table-cell-3-${index}" class="order-table-content">
            ${servicesString}
            <div class="highlighted-underlined" onclick="openModal('service-selection-modal'), bestill.create_all_modal_checkboxes(${index})">Rediger</div>
        </div>
        <div id="kandidat-table-cell-4-${index}" class="order-table-content">
            <div class="highlighted-underlined" onclick="removeCandidate(${index})">
                Fjern kandidat
            </div>
        </div>
        `
        element.innerHTML += content;
        bestill.create_all_receipt_rows();
    },

    create_all_rows: function(length) {
        if (!length) {
            length = candidates.length
        }

        for (let i = 0; i < length; i++) {
            try {
                this.delete_table_row(i, 5, "kandidat");
            } catch {

            }
        }
        for (let i = 0; i < candidates.length; i++) {
            this.new_table_row(i);
        }

        for (let i = 0; i < candidates.length; i++) {
            fileInputID = `file-input-${i}`;
            attachmentAddEventListener(`${fileInputID}-${i}`, i);
        }

        updatePriceEstimates();
    },

    delete_table_row: function(index, columns, table) {
        for(let i = 0; i < columns; i++) {
            document.getElementById(`${table}-table-cell-${i}-${index}`).remove();
        }
    },

    create_serivce: function(name, description) {
        let included = 0
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].services.includes(name)) {
                included++;
            }
        }

        let checkImage = "checkbox-unchecked.svg";
        if (included == candidates.length) {
            checkImage = "checkbox-checked.svg"
        } else if (included == 0) {
            checkImage = "checkbox-unchecked.svg";
        } else {
            checkImage = "checkbox-minus.svg";
        }

        element = document.getElementById("tjenester-card-section");
        content = `
        <div class="checkbox-card">
            <h3>${name}</h3>
            <img class="checkbox-card-icon" src="images/search-icon.svg"/>
            <div class="checkbox-card-text">${description}</div>
            <img class="checkbox-icon" onclick="serviceCheckBox(null, '${name}')" id="${name}-checkbox" src="images/${checkImage}"/>
        </div>`

        element.innerHTML += content;
    },

    create_all_services: function() {
        Object.keys(services).forEach(function(key) {
            bestill.create_serivce(services[key].name, services[key].description);
        });
    },

    onchange_name: function(index) {
        candidates[index].name = document.getElementById(`kandidat-name-input-${index}`).value;
    },

    onchange_info: function(index) {
        candidates[index].information = document.getElementById(`table-cell-1-${index}`).value;
    },

    create_modal_checkbox: function(index, name, checked) {
        if(checked) {
            checkbox = "checkbox-checked";
        } else {
            checkbox = "checkbox-unchecked";
        }
        content = `
        <div class="modal-service-option">
            <img class="modal-service-icon" src="images/search-icon.svg"/>
            <div id="${name}">${name}</div>
            <img class="modal-checkbox" onclick="serviceCheckBox(${index}, '${name}')" id="${name}-modal-checkbox" src="images/${checkbox}.svg"/>
        </div>`

        element = document.getElementById("service-selection-container");
        element.innerHTML += content;
    },

    create_all_modal_checkboxes: function(index) {
        document.getElementById("service-selection-container").innerHTML = "";
        Object.keys(services).forEach(function(key) {
            bestill.create_modal_checkbox(index, services[key].name, candidates[index].services.includes(services[key].name));
        });
    },

    receipt_table_rows: 0,
    create_receipt_row: function(info, id) {
        element = document.getElementById("receipt-table");
        content = "";
        for(let i = 0; i < info.length; i++){
            content += `
            <div id="receipt-table-cell-${i}-${id}" class="order-table-content">
                ${info[i]}
            </div>`
        }
        this.receipt_table_rows++;

        element.innerHTML += content;
    },

    create_all_receipt_rows: function() {
        // Delete all rows
        for (let i = 0; i < this.receipt_table_rows; i++) {
            this.delete_table_row(i, 4, "receipt");
        }
        this.receipt_table_rows = 0;

        iterations = 0;
        Object.keys(services).forEach(function(key) {
            let amount = 0;
            let totalPrice = 0;
            for (let i = 0; i < candidates.length; i++) {
                if (candidates[i].services.includes(services[key].name)) {
                    amount++;
                    totalPrice += services[services[key].name].price;
                }
            }
            if (amount > 0) {
                bestill.create_receipt_row([services[key].name, amount, services[services[key].name].price, totalPrice], iterations);
                iterations++;
            }
        });
    }
}

bestill.create_all_services();
bestill.create_all_rows();