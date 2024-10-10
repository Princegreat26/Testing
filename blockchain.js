const apiKey = 'f82d564f-2d8d-4074-ad73-fefecc0a876f'; // Your NOWNodes API key
const btcUrl = 'https://btc.nownodes.io'; // URL for Bitcoin node

// Fetch Bitcoin data (for example)
async function getBitcoinData() {
  try {
    const response = await fetch(btcUrl, {
      method: 'GET',
      headers: { 'f82d564f-2d8d-4074-ad73-fefecc0a876f': f82d564f2d8d4074ad73fefecc0a876f }
    });
    const data = await response.json();
    
    // Update the dashboard with the fetched data
    document.getElementById('bitcoin-price').textContent = `$${data.result.last}`;
    document.getElementById('bitcoin-change').textContent = `${data.result.change}%`;
  } catch (error) {
    // console.error('Error fetching Bitcoin data:', error);
  }
}

// Call the function when the page loads
getBitcoinData();
