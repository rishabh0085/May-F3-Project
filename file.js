//JavaScript for Fetching Data:
async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//JavaScript for Rendering Table:
function renderTable(data) {
    const tableBody = document.getElementById('cryptoTableBody');
    tableBody.innerHTML = '';
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

//JavaScript for Sorting by Market Cap:
function sortByMarketCap() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.querySelectorAll('tr'));
    const sortedRows = rows.slice(1).sort((a, b) => {
        const aMarketCap = parseFloat(a.cells[2].textContent.replace('$', '').replace(/,/g, ''));
        const bMarketCap = parseFloat(b.cells[2].textContent.replace('$', '').replace(/,/g, ''));
        return bMarketCap - aMarketCap;
    });
    table.removeChild(table.tBodies[0]);
    sortedRows.forEach(row => table.appendChild(row));
}


//JavaScript for Sorting by Percentage Change:
function sortByPercentageChange() {
    const table = document.getElementById('cryptoTable');
    const rows = Array.from(table.querySelectorAll('tr'));
    const sortedRows = rows.slice(1).sort((a, b) => {
        const aPercentageChange = parseFloat(a.cells[3].textContent.replace('%', ''));
        const bPercentageChange = parseFloat(b.cells[3].textContent.replace('%', ''));
        return bPercentageChange - aPercentageChange;
    });
    table.removeChild(table.tBodies[0]);
    sortedRows.forEach(row => table.appendChild(row));
}

