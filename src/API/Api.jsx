// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQAkcaG_7AGRJG2SBiQQk22FUIqb_tT_nCjRsuMd54tCYlnbPX-rXVW5-_XnxcUXQSJqNFP4PBfIO4E-RlPz5slFiKYpyVmrE5PK9OnEFl4DQ7SXjzg1EIS8EC0uCYR7emYxoFoqU4FtuNPlI8gYGtNnLrxLicBIup9ynzVHmXIR1-ITK1teZ1Pmb9gmRsUNKAd_bqxne-ExOaT2YXhg214lBhvDA-T_cF_V5Z4WUjuN2a_zV4vr2iBNHGbHfKLQx88nEv5M_bdrOSuUVPE30DmNGDEtPXLxyqw_tdGDOoirgx3XNFWuIqAQfhazF5y_o7aI-boilw';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// async function getTopTracks(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//   )).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );


import { useEffect, useState } from "react";

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  const token = "5c77514abb3e494997e7ba55b04e4901"; // dynamic hona chahiye (baad me bataunga)

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTracks(data.items);
      });
  }, []);

  return (
    <div>
      <h2>Top Tracks</h2>

      {tracks.map(track => (
        <div key={track.id}>
          <h4>{track.name}</h4>
          <p>{track.artists.map(a => a.name).join(", ")}</p>

          {/* 🎧 Play preview */}
          {track.preview_url && (
            <audio controls src={track.preview_url}></audio>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopTracks;