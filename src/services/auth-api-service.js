import config from '../config';
import TokenService from './token-service';


const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(credentials)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(user)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  postBand(band) {
    return fetch(`${config.API_ENDPOINT}/bands`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(band)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  postSong(song) {
    return fetch(`${config.API_ENDPOINT}/bands/1/songs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(song)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  postSetlist(bandId, setlist) {

    const options = document.getElementById("right").childNodes
    let songsToSave = [];
    options.forEach((option) => {
      songsToSave.push({
        song_id: option.getAttribute("song_id"),
        band_id: option.getAttribute("band_id")
      });
    });

    let setlistJSON = JSON.stringify({
      newSetlist: setlist,
      songsToAdd: songsToSave
    });
    console.log('setlistjson', setlistJSON);
    return fetch(`${config.API_ENDPOINT}/bands/${bandId}/setlists/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: setlistJSON
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

}

export default AuthApiService;