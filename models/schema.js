import fs from 'fs';
import Sequelize from 'sequelize';
import csv from 'fast-csv';
import GeoCoder from './GeoCoder';

const db_conn = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/bob-database';

const Conn = new Sequelize(db_conn);

const Business = Conn.define('business', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING,
		allowNull: true
	},
	category: {
		type: Sequelize.STRING,
		allowNull: true
	},
	description: {
		type: Sequelize.STRING,
	  	allowNull: true
	},
	latitude: {
		type: Sequelize.FLOAT,
	  	allowNull: true
	},
	longitude: {
		type: Sequelize.FLOAT,
		allowNull: true
	}
});

// A conditional variable for if we every need to reload the data
if (process.env.RELOAD) {
    // Sync our definitions, overriding previous renditions of models here
    Conn.sync({force: true})
  	    .then(() => {

		    // Instantiate our custom GeoCoder class
		    let coder = new GeoCoder();
		    // Port over the bob listings here
		    let stream = fs.createReadStream("models/BOB_DATA.csv");
		    csv
			    .fromStream(stream, {headers: true})
			    .on("data", (data) => {
                    // Upon receiving row of csv data,
                    // make call for lat, lon info
				    coder.toLatLon(data.address)
					    .then((latLon) => {
						    console.log('SUCCESS ******', latLon);
						    return Business.create({
							    name: data["company_name"],
							    address: data["address"],
							    category: data["company_type"],
							    description: data["description"],
							    latitude: latLon[0],
							    longitude: latLon[1]
						    });
					    })
					    .catch((error) => {
						    console.warn('ERROR ******', error);
					    });
			    })
			    .on("end", () => console.log("FIN ******"));

	    }); // Successful connection to database
}
export default Conn;
