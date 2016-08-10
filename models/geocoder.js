import MapBoxClient from 'mapbox';

// A GeoCoder class that talks to the MapZen API.
export default class GeoCoder {
	constructor() {
        // Initialize our MapBoxClient with our API token
		this.client = new MapBoxClient('pk.eyJ1IjoiZW1rayIsImEiOiJjaXJoemNtbW4wMjBoZnlreGgycjJpcjVuIn0.cHqBp6dJMRzuEwuREQ0TyA');
		// Our delay factor
		this.delayFactor = 1;
	}

	// Sleep implementation for rate limiting
    sleep() {
        const offset = this.delayFactor++ * 200;
        return new Promise((resolve) => setTimeout(resolve, offset));
    }

    // Make a request to the MapBox API with an addressString of interest
	toLatLon(addressString) {
        // Wait in a step-dependent interval, then create and subsequently execute our promise
		return this.sleep().then(() => {
		    let promise = new Promise((resolve, reject) => {
                console.log(`****** ADDRESS OF INTEREST ${addressString}`);
                this.client.geocodeForward(addressString, (err, result) => {
                    if (err) reject(err);

                    resolve(result.features[0].geometry.coordinates);
                });
            });
            return promise;
        });
    }

	// Make a request to the MapBox API with lat, lon tuple of interest
	fromLatLon(lat, lon) {
        // Wait in a step-dependent interval, then create and subsequently execute our promise
        return this.sleep().then(() => {
		    let promise = new Promise((resolve, reject) => {
		        this.client.geocodeReverse(`${lat},${lon}`, (err, result) => {
		            if (err) reject(err);

		            resolve(result);
		        });
		    });
		    return promise;
		});
	}
}
