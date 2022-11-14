const bestill = {
    table_rows: 1,
    new_table_row: function() {
        element = document.getElementById("kandidat-table");
        content = `
        <div id="table-cell-0-${this.table_rows}" class="kandidat-table-content">
            <input class="kandidat-name-input" type="text" placeholder="Skriv inn navn"/>
        </div>
        <textarea id="table-cell-1-${this.table_rows}" class="kandidat-info-input kandidat-table-content" type="text" placeholder="Skriv inn ytterlig informasjon"></textarea>
        <div id="table-cell-2-${this.table_rows}" class="kandidat-table-content">
            <label for="file-input">
                Last opp dokument
                <input id="file-input" type="file"/>
            </label>
        </div>
        <div id="table-cell-3-${this.table_rows}" class="kandidat-table-content">

        </div>
        <div id="table-cell-4-${this.table_rows}" class="kandidat-table-content">
            <div class="fjern-kandidat" onclick="bestill.delete_table_row(${this.table_rows})">
                Fjern kandidat
            </div>
        </div>
        `
        element.innerHTML += content
        this.table_rows++;
    },

    delete_table_row: function(id) {
        for(let i = 0; i < 5; i++) {
            document.getElementById(`table-cell-${i}-${id}`).remove();
        }
    },
}