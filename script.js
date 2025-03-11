function storeShipment() {
    let binBarcode = document.getElementById("binBarcode").value.trim();
    let shipmentBarcode = document.getElementById("shipmentBarcode").value.trim();

    if (binBarcode === "" || shipmentBarcode === "") {
        alert("Please enter both bin and shipment barcodes.");
        return;
    }

    const dbRef = ref(db, "shipments/" + shipmentBarcode);
    
    set(dbRef, {
        shipmentNumber: shipmentBarcode,
        binLocation: binBarcode
    })
    .then(() => {
        alert(`Shipment ${shipmentBarcode} stored in bin ${binBarcode}`);
        document.getElementById("binBarcode").value = "";
        document.getElementById("shipmentBarcode").value = "";
    })
    .catch((error) => {
        alert("Error storing shipment: " + error);
    });
}

function findShipment() {
    let shipmentNumber = document.getElementById("searchShipment").value.trim();

    if (shipmentNumber === "") {
        alert("Please enter a shipment number.");
        return;
    }

    const dbRef = ref(db);
    
    get(child(dbRef, "shipments/" + shipmentNumber)).then((snapshot) => {
        if (snapshot.exists()) {
            let binLocation = snapshot.val().binLocation;
            document.getElementById("result").innerText = `Shipment ${shipmentNumber} is stored in bin ${binLocation}`;
        } else {
            document.getElementById("result").innerText = "Shipment not found.";
        }
    }).catch((error) => {
        alert("Error retrieving shipment: " + error);
    });
}

