import wixWindow from 'wix-window';
import wixData from 'wix-data';


$w.onReady(function () {
    //TODO: write your page related code here...
    $w("#locationPermissionError").collapse()
    wixData.query("Test").find().then(results => {
        let locations = results.items;
        console.log(locations)
        getCurrentLocation(locations)
        $w("#html1").onMessage((event) => {
            let receivedData = event.data;
            console.log(receivedData);
        });
        $w("#currentLocationButton").onClick(() => {
            getCurrentLocation(locations, true)
        })
    })
});

function getCurrentLocation(locations, status) {
    let loaded = status;
    let JSON = { features: locations }
    wixWindow.getCurrentGeolocation().then(obj => {
        // console.log(obj)
        JSON.currentLocation = obj.coords
        $w("#html1").postMessage(JSON)
    }).catch(err => {
        $w("#locationPermissionError").expand()
        if (!status) {
            $w("#html1").postMessage(JSON)
        }
    })
}

