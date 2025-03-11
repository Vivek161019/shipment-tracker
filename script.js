// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("✅ Login successful!");
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("appContainer").style.display = "block";
        })
        .catch(error => {
            alert("❌ Error: " + error.message);
        });
}

// Logout Function
function logout() {
    auth.signOut().then(() => {
        alert("✅ Logged out.");
        document.getElementById("loginContainer").style.display = "block";
        document.getElementById("appContainer").style.display = "none";
    });
}

// Check if User is Logged In
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("appContainer").style.display = "block";
    } else {
        document.getElementById("loginContainer").style.display = "block";
        document.getElementById("appContainer").style.display = "none";
    }
});

// Store Shipment Function
function storeShipment() {
    let binBarcode = document.getElementById("binBarcode").value.trim();
    let shipmentBarcode = document.getElementById("shipmentBarcode").value.trim();

    if (binBarcode === "" || shipmentBarcode === "") {
        alert("❌ Please enter both Bin and Shipment barcodes.");
        return;
    }

    const dbRef = database.ref("shipments/" + shipmentBarcode);
    
    dbRef.set({
        shipmentNumber: shipmentBarcode,
        binLocation: binBarcode
    })
    .then(() => {
        alert(`✅ Shipment ${shipmentBarcode} stored in Bin ${binBarcode}`);
        document.getElementById("binBarcode").value = "";
        document.getElementById("shipmentBarcode").value = "";
    })
    .catch((error) => {
        alert("⚠️ Error storing shipment: " + error);
    });
}

// Find Shipment Function
function findShipment() {
    let shipmentNumber = document.getElementById("searchShipment").value.trim();

    if (shipmentNumber === "") {
        alert("❌ Please enter a Shipment number.");
        return;
    }

    const dbRef = database.ref("shipments/" + shipmentNumber);
    
    dbRef.get().then(snapshot => {
        if (snapshot.exists()) {
            let binLocation = snapshot.val().binLocation;
            document.getElementById("result").innerText = `✅ Shipment ${shipmentNumber} is stored in Bin ${binLocation}`;
        } else {
            document.getElementById("result").innerText = "⚠️ Shipment not found.";
        }
    }).catch((error) => {
        alert("⚠️ Error retrieving shipment: " + error);
    });
}
