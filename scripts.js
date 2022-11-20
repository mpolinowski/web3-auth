// Global wallet address variable
window.userWalletAddress = null
  
// Show wallet address from stored variable
const showUserWalletAddress = () => {
    const walletAddressEl = document.querySelector(".wallet-address")
    walletAddressEl.innerHTML = window.userWalletAddress
}

// Get wallet balance
const getWalletBalance = async () => {
    if (!window.userWalletAddress) {
      return false
    }
    const balance = await window.web3.eth.getBalance(window.userWalletAddress)
    // Convert the balance to ether
    document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
      balance,
      "ether"
    )
}

// Check if metamask is available and if user is logged in already
window.onload = async (event) => {

  // Check if ethereum extension is installed
  if (window.ethereum) {
    // Create instance
    window.web3 = new Web3(window.ethereum)
  } else {
    // Prompt to install
    alert("Please install MetaMask or any Ethereum Extension Wallet")
  }
  // Check if already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress")
  // Show dashboard
  showUserDashboard()
}
 
// Web3 login function
const loginWithEth = async () => {
    // Check if there is global instance
    if (window.web3) {
      try {
        // Get the user's account
        const selectedAccount = await window.ethereum
          .request({
            // Prompt metamask to login
            method: "eth_requestAccounts",
          })
          .then((accounts) => accounts[0])
          .catch(() => {
            // Catch cancelled login
            throw Error("Please select an account")
          })
  
        // Set global wallet address variable
        window.userWalletAddress = selectedAccount
  
        // Store in local storage => can be moved to db later
        window.localStorage.setItem("userWalletAddress", selectedAccount)
  
        // Show dashboard
        showUserDashboard()
  
      } catch (error) {
        alert(error)
      }
    } else {
      alert("Wallet not found")
    }
  }
  
// Bind function to login button
document.querySelector(".login-btn").addEventListener("click", loginWithEth)
  

// Show the user dashboard
const showUserDashboard = async () => {

    // If not logged in
    if (!window.userWalletAddress) {
  
      // Change the page title
      document.title = "Web3 Login"
  
      // Show the login
      document.querySelector(".login-section").style.display = "flex"
  
      // Hide dashboard
      document.querySelector(".dashboard-section").style.display = "none"
      return false;
    }
  
    // change the page title
    document.title = "Metamask Dashboard"
  
    // Hide the login
    document.querySelector(".login-section").style.display = "none"
  
    // Show dashboard
    document.querySelector(".dashboard-section").style.display = "flex"
  
    // Show wallet address from stored variable
    showUserWalletAddress()
    // Get wallet balance
    getWalletBalance();
};


// Web3 logout
const logout = () => {
    // Set the global userWalletAddress to null
    window.userWalletAddress = null
  
    // Remove wallet address from local storage
    window.localStorage.removeItem("userWalletAddress")
  
    // Show the user dashboard
    showUserDashboard()
  }
  
  // Bind function to logout button
  document.querySelector(".logout-btn").addEventListener("click", logout)