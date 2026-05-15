import { Polyline, Map, APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

// 1. use geocode to convert address to coordinates
// 2. From coordinates, generate encoded polyline
// 3. Using encoded polyline, generate map using react-google-maps

interface IAddresses {
  customer: string;
  restaurant: string;
  apikey: string;
}

export const MapComponent = ({customer, restaurant, apikey}: IAddresses) => {
  const [encodedPath, setEncodedPath] = useState<string>("");
  // const [address1, setAddress1] = useState<string>();
  // const [address2, setAddress2] = useState<string>();

  const key = apikey;

  async function postData(url = "", data = {}) {

    const response = await fetch(url, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline"
        //routes.duration,routes.distanceMeters,routes.polyline, routes.legs,routes.travelAdvisory.tollInfo,routes.legs.travelAdvisory.tollInfo,routes.travelAdvisory.speedReadingIntervals
      },
      body: JSON.stringify(data), // Body data must match Content-Type header
    });
    return response.json(); // Parses JSON response into native JavaScript objects
  }

  useEffect(() => {
    getEncodedPolyline();
  },[])


  const getEncodedPolyline = async () => {
    console.log(customer, restaurant)
    const response = await fetch(`https://geocode.googleapis.com/v4/geocode/address/${customer}`
      , {
        method: "GET", // Specify the method
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
        },
      })

    const response2 = await fetch(`https://geocode.googleapis.com/v4/geocode/address/${restaurant}`
      , {
        method: "GET", // Specify the method
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
        },
      })

    const r1 = await response.json();
    //if (Object.keys(r1).length === 0) alert("Invalid Address(s): Please Provide Valid Address 1")
    const latitude1 = r1?.results[0]?.location?.latitude;
    const longitude1 = r1?.results[0]?.location?.longitude;

    const r2 = await response2.json();
    //if (Object.keys(r2).length === 0) alert("Invalid Address(s): Please Provide Valid Addreses 2")
    const latitude2 = r2?.results[0]?.location?.latitude;
    const longitude2 = r2?.results[0]?.location?.longitude;


    const body = {
      "origin": {
        "location": {
          "latLng": {
            "latitude": latitude1,
            "longitude": longitude1
          }
        }
      },
      "destination": {
        "location": {
          "latLng": {
            "latitude": latitude2,
            "longitude": longitude2
          }
        }
      },
      "travelMode": "DRIVE",
      "routingPreference": "TRAFFIC_AWARE",
    }
    //if (Object.keys(r2).length === 0) alert("Invalid Address(s): Please Provide Valid Addresses")

    try {
      const r = await postData("https://routes.googleapis.com/directions/v2:computeRoutes", body)
      const poly: string = r?.routes[0]?.polyline?.encodedPolyline;
      setEncodedPath(poly);
    } catch {
      //if (!r1) alert("Invalid Address(s): Please Provide Valid Addresses")
    }


  }

  // let staticMapsUrl = createStaticMapsUrl({
  //   apiKey: key,
  //   width: 5000,
  //   height: 5000,
  //   zoom: 11,
  //   center: { lat: 34.0522, lng: -118.2437 },

  //   paths: [
  //     {
  //       coordinates: `enc:${encodedPath}`,
  //       weight: 7,
  //       color: "blue",
  //     }
  //   ]
  // });

  return (
    <>
      {/* <button onClick={() => getEncodedPolyline()}>Get Polyline</button> */}
      {/* <input placeholder="Address 1" value={customer} onChange={e => setAddress1(e.target.value)} /> */}
      {/* <input placeholder="Address 2" value={restaurant} onChange={e => setAddress2(e.target.value)} /> */}

      <APIProvider apiKey={key}>
        <Map
          style={{ width: "75vw", height: "750px" }}
          defaultCenter={{ lat: 34.0522, lng: -118.2437 }}
          defaultZoom={10}
        >
          <Polyline
            encodedPath={encodedPath}
            strokeColor={'#0088ff'}
            strokeWeight={4}
          />

        </Map>
      </APIProvider>
      {/* <div style={{ width: "50vw", height: "50vh" }}>
        <StaticMap url={staticMapsUrl} />
      </div> */}
    </>
  )
}

