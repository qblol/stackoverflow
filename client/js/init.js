$(document).ready(function(){
   $('.modal').modal();
 });
  let app = new Vue({
    el: '#root',
    data: {
      houses: '',
      get: {
        _id: '',
        title: '',
        price: '',
        address: '',
        description: '',
        photo: '',
        latitude: '',
        longitude: ''
      },
      add: {
        title: '',
        price: '',
        address: '',
        description: '',
        photo: '',
        latitude: '',
        longitude: ''
      }
    },
    methods: {
      loadAddMaps: function() {
        setTimeout(function(){
          var map = new GMaps({
            div: '#maps-add',
            lat: -12.043333,
            lng: -77.028333,
            click: function(position){
              map.removeMarkers()
              map.addMarker({
                lat: position.latLng.lat(),
                lng: position.latLng.lng()
              })
              app.add.latitude = position.latLng.lat()
              app.add.longitude = position.latLng.lng()
            }
          });
          map.addControl({
            position: 'top_right',
            content: 'Geolocate',
            style: {
              margin: '5px',
              padding: '1px 6px',
              border: 'solid 1px #717B87',
              background: '#fff'
            },
            events: {
              click: function(){
                GMaps.geolocate({
                  success: function(position) {
                    map.setCenter(position.coords.latitude, position.coords.longitude);
                    map.removeMarkers();
                    map.addMarker({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                      title: 'You`re here'
                    })
                    app.add.latitude = position.coords.latitude
                    app.add.longitude = position.coords.longitude
                  },
                  error: function(error) {
                    alert('Geolocation failed: '+ error.message);
                  },
                  not_supported: function() {
                    alert("Your browser does not support geolocation");
                  }
                });
              }
            }
          });
        }, 100);
      },
      loadHouses: function(){
        $.ajax({
          url: 'http://localhost:3000/api/houses',
          type: 'GET',
          success: function(data) {
            app.houses = data
          }
        })
      },
      getHouse: function(id) {
        $.ajax({
          url: `http://localhost:3000/api/houses/${id}`,
          type: 'GET',
          success: function(data) {
            app.get._id = data._id
            app.get.title = data.title
            app.get.price = data.price
            app.get.address = data.address
            app.get.description = data.description
            app.get.photo = data.photo
            app.get.latitude = data.latitude
            app.get.longitude = data.longitude
          }
        })
        setTimeout(function(){
          var map = new GMaps({
            div: '#maps-edit',
            lat: app.get.latitude,
            lng: app.get.longitude,
            click: function(position){
              map.removeMarkers()
              map.addMarker({
                lat: position.latLng.lat(),
                lng: position.latLng.lng()
              })
              app.get.latitude = position.latLng.lat()
              app.get.longitude = position.latLng.lng()
            }
          });
          map.addMarker({
            lat: app.get.latitude,
            lng: app.get.longitude
          })
          map.addControl({
            position: 'top_right',
            content: 'Geolocate',
            style: {
              margin: '5px',
              padding: '1px 6px',
              border: 'solid 1px #717B87',
              background: '#fff'
            },
            events: {
              click: function(){
                GMaps.geolocate({
                  success: function(position) {
                    map.setCenter(position.coords.latitude, position.coords.longitude);
                    map.removeMarkers();
                    map.addMarker({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                      title: 'You`re here'
                    })
                    app.get.latitude = position.coords.latitude
                    app.get.longitude = position.coords.longitude
                  },
                  error: function(error) {
                    alert('Geolocation failed: '+ error.message);
                  },
                  not_supported: function() {
                    alert("Your browser does not support geolocation");
                  }
                });
              }
            }
          });
        }, 100);
      },
      addHouse: function() {
        $.ajax({
          url: 'http://localhost:3000/api/houses',
          type: 'POST',
          data: {
            title: app.add.title,
            price: app.add.price,
            address: app.add.address,
            description: app.add.description,
            photo: app.add.photo,
            latitude: app.add.latitude,
            longitude: app.add.longitude
          },
          success: function(data) {
            app.houses.unshift(data)
            app.add.title = ''
            app.add.price = ''
            app.add.address = ''
            app.add.description = ''
            app.add.photo = ''
            app.add.latitude = ''
            app.add.longitude = ''
          }
        })
      },
      editHouse: function(){
        $.ajax({
          url: `http://localhost:3000/api/houses/${app.get._id}`,
          type: 'PUT',
          data: {
            title: app.get.title,
            price: app.get.price,
            address: app.get.address,
            description: app.get.description,
            photo: app.get.photo,
            latitude: app.get.latitude,
            longitude: app.get.longitude,
            sold: false
          },
          success: function(data) {
            app.loadHouses()
          }
        })
      },
      deleteHouse: function(id) {
        $.ajax({
          url: `http://localhost:3000/api/houses/${id}`,
          type: 'DELETE',
          success: function(data) {
            app.loadHouses()
          }
        })
      }
    }
  })
  app.loadHouses();
