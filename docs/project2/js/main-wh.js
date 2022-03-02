document.getElementById("menu").addEventListener("click", function() {
    document.getElementById("information").classList.toggle("close");
    this.classList.toggle("close");

    document.getElementById("information2").classList.toggle("close");
});
document.getElementById("information").addEventListener("click", function() {
    this.classList.toggle("close");
    document.getElementById("information2").classList.toggle("close");
});
// const toggle_btn = document.querySelector('.js_toggle');
// const panel = document.querySelector('.panel');
// toggle_btn.onclick = function(e) {
//     // e.preventDefault();
//     panel.classList.toggle("panelClose"); //https://www.runoob.com/jsref/prop-element-classlist.html

// };
{ /* <script> */ }
// (function (i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
//         (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date(); a = s.createElement(o),
//         m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
// })(window, document, 'script', '/js/analytics.js', 'ga');

// ga('create', 'UA-66964210-2', 'auto');
// ga('send', 'pageview');

// https://worldpostalcode.com/canada/ontario/toronto
// document.addEventListener("DOMContentLoaded",  
//    function () { if (document.body.clientWidth <= 480) { document.getElementById('search').setAttribute("placeholder", "Address, Country, City...") } }); var header = document.getElementsByClassName('header')[0], scroll_button = document.getElementById('toTop'); window.onscroll = function (ev) {
//     var scrollTop = window.pageYOffset || document.body.scrollTop; if (scrollTop > header.offsetHeight + 100) { scroll_button.style.display = 'block' }
//     else { scroll_button.style.display = 'none' }
// }; 
// function scrollToElem(element, to, duration) { if (duration < 0) return; var difference = to - element.scrollY; var perTick = difference / duration * 2; setTimeout(function () { window.scrollTo(0, element.scrollY + perTick); scrollToElem(element, to, duration - 2) }, 10) }
// document.getElementById('nav_toggle').onclick = function (ev) { document.getElementById('nav_container').innerHTML = '<div class="nav_close" onClick="navClose(); return false;"></div><ul>' + document.getElementById('nav').innerHTML + '</ul>'; document.getElementById('nav_container').style.display = 'block' }
// function navClose() { document.getElementById('nav_container').style.display = 'none' }
// var map = '', myicon = '', first_geocode = 0; 
// function initialize() {
//     map = L.map('map_canvas'); var in_geocode = 0; L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxNativeZoom: 19, maxZoom: 20 }).addTo(map); myicon = L.icon({ iconUrl: '/images/marker.svg', iconSize: [29, 40], iconAnchor: [14.5, 40], popupAnchor: [0, -36] }); if (typeof (lat) != 'undefined') { map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]]); marker = L.marker([lat, lng], { icon: myicon }).bindPopup('<h3>' + mapsearch + '</h3><div class="latlng first">' + 'Latitude : ' + lat + '<br/>Longitude: ' + lng + '</div>').addTo(map).openPopup(); map.setView([lat, lng]) }
//     else if (typeof (address) != 'undefined') { first_geocode = 1; geocode(address) }
//     else {
//         var us_center = [40, -95]; if (typeof (geolocation) != 'undefined') {
//             if (navigator.geolocation) { first_geocode = 1; var successCallback = function (data) { map.setView([data.coords.latitude, data.coords.longitude], 18); var message = '<h3>My Postal/Zip Code</h3><div class="lookup_result" style="width:200px">Detecting zip code...</div>'; marker = L.marker([data.coords.latitude, data.coords.longitude], { icon: myicon }).bindPopup(message).addTo(map).openPopup(); geocode("", data.coords.latitude, data.coords.longitude, 1, data.coords.accuracy) }; var failureCallback = function () { var message = '<h3>My Postal/Zip Code</h3><div class="lookup_result">Location detection failure</div>'; marker = L.marker(us_center, { icon: myicon }).bindPopup(message).addTo(map).openPopup(); GetJSONData(); map.on('zoomend', GetJSONData); map.on('dragend', GetJSONData) }; map.setView(us_center, zoom); var message = '<h3>My Postal/Zip Code</h3><div class="lookup_result" style="width:200px">Detecting geolocation...</div>'; marker = L.marker(us_center, { icon: myicon }).bindPopup(message).addTo(map).openPopup(); navigator.geolocation.getCurrentPosition(successCallback, failureCallback) }
//             else { map.setView(us_center, zoom); var message = '<h3>My Postal/Zip Code</h3><div class="lookup_result">Sorry, but geolocation services are not supported by your browser</div>'; marker = L.marker(us_center, { icon: myicon }).bindPopup(message).addTo(map).openPopup() }
//         } else map.setView(us_center, zoom)
//     }
//     map.on('click', function (e) { geocode("", e.latlng.lat, e.latlng.lng) })
//     function geocode(address, lat, lng, myzip = 0, accuracy = 0, first_iteration = 0) {
//         if (in_geocode == 0) {
//             in_geocode = 1; var http = new XMLHttpRequest(); if (address == "") var params = 'type=1&lat=' + lat + '&lng=' + lng; else var params = 'type=2&address=' + encodeURIComponent(address); http.open('POST', "/geocode", !0); http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); http.onreadystatechange = function () {
//                 if (http.readyState == 4) {
//                     in_geocode = 0; var postcode_name = 'Postal code'; var dop_zip = c_id = ''; if (http.status == 200) {
//                         r = JSON.parse(http.responseText); var name_str = 'Sorry, but our Geocoder could not find this location'; var postcode = 'unknown'; var p_ext = ''; if (r.result == !0) {
//                             if (r.postcode != "") postcode = '<b>' + r.postcode + '</b>'; name_str = r.address; if (address != "") { lat = r.lat; lng = r.lng; map.setView([lat, lng], 18) }
//                             if (r.name) postcode_name = r.name; if (r.zip4_low && r.zip4_high) {
//                                 if (r.zip4_low == r.zip4_high) { dop_zip = '<br>ZIP+4 code: <b>' + r.zip4_low + '</b>'; if (!r.fullzip) name_str = name_str.replace(r.postcode, r.postcode + '-' + r.zip4_low) }
//                                 else dop_zip = '<br>ZIP+4 code: from <b>' + r.zip4_low + '</b> to <b>' + r.zip4_high + '</b>'; c_id = '<br>Carrier route: ' + r.route_id
//                             }
//                         }
//                     }
//                     if (myzip == 0) { var message_title = 'Postal/Zip Code Lookup'; var accuracy_text = "" } else { var message_title = 'My Postal/Zip Code'; var accuracy_text = "Accuracy: <b>" + accuracy + ' meters</b><br>' }
//                     if ((address != "") && (typeof (lat) == 'undefined')) { lat = 40; lng = -95; map.setView([40, -95], 2); var latlng_text = '' }
//                     else var latlng_text = '<div class="latlng">' + accuracy_text + 'Latitude: ' + lat + '<br>Longitude: ' + lng + '</div>'; var message = '<h3>' + message_title + '</h3><div class="lookup_result">' + postcode_name + ': ' + postcode + dop_zip + '<br>Postal address: ' + name_str + c_id + '</div>' + latlng_text; if (typeof (marker) !== 'undefined') { marker.setLatLng([lat, lng]).setPopupContent(message).openPopup() } else { marker = L.marker([lat, lng], { icon: myicon }).bindPopup(message).addTo(map).openPopup() }
//                     if (first_geocode == 1) { first_geocode = 0; GetJSONData(); map.on('zoomend', GetJSONData); map.on('dragend', GetJSONData) }
//                 }
//             }
//             http.send(params)
//         }
//     }
//     if (first_geocode == 0) { GetJSONData(); map.on('zoomend', GetJSONData); map.on('dragend', GetJSONData) }
// }
// if (typeof (map_load) != 'undefined') document.addEventListener("DOMContentLoaded", initialize); 
// function showAllCountries() { var e, n = document.getElementsByClassName("c_more"); for (e = 0; e < n.length; e++)n[e].classList.remove("c_more"); document.getElementById("c_more_link").style.display = "none" }
// var polyLayer = ""; function GetJSONData(bounds, zoom) {
//     var bounds = map.getBounds(), zoom = map.getZoom(); if (bounds) { var lt = bounds._northEast.lat; var ln = bounds._northEast.lng }
//     if (zoom > 9 && bounds && ((lt > -14.5 && lt < 11 && ln > -171.5 && ln < -169) || (lt > 13 && lt < 15.5 && ln > 144.5 && ln < 146) || (lt > 18 && lt < 71.5 && ln > -177 && ln < -64))) { var sBody = 'zoom=' + zoom + '&bounds=' + bounds._northEast.lat + ';' + bounds._northEast.lng + ';' + bounds._southWest.lat + ';' + bounds._southWest.lng; var oXmlHttp = createXMLHttp(); oXmlHttp.open("POST", '/getbounds', !0); oXmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); oXmlHttp.onreadystatechange = function () { if (oXmlHttp.readyState == 4) { if (oXmlHttp.status == 200) { var response = oXmlHttp.responseText; clean_map(); var json = JSON.parse(response); if (typeof (json.type) != 'undefined') { if (zoom > 11) var weight = 2; else var weight = 1.5; var polyLayer = L.geoJSON(null, { style: function (feature) { return { color: "#10477A", weight: weight, fill: !1, opacity: 0.5, clickable: !1 } }, onEachFeature: function (feature, layer) { layer.bindTooltip(feature.properties.name, { permanent: !0, className: "big_label", direction: "center" }) } }); polyLayer.addData(JSON.parse(response)); polyLayer.on("add", function () { polyLayer.openTooltip() }); map.addLayer(polyLayer) } } else { } } }; oXmlHttp.send(sBody) }
//     else clean_map()
// }
// function clean_map() {
//     map.eachLayer(function (layer) {
//         if (layer instanceof L.GeoJSON) { map.removeLayer(layer) }
//     })
// }
// function createXMLHttp() {
//     if (typeof XMLHttpRequest != "undefined") { return new XMLHttpRequest() }
//     else if (window.ActiveXObject) {
//         var aVersions = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"]; for (var i = 0; i < aVersions.length; i++) {
//             try { var oXmlHttp = new ActiveXObject(aVersions[i]); return oXmlHttp }
//             catch (oError) { }
//         }
//         throw new Error("XMLHttp.")
//     }
// }
// function ShowCodes(letter) {
//     var letters = document.getElementsByClassName('letter_container'); if (letter != '0' && letter != '1') {
//         for (var i = 0; i < letters.length; i++)
//             letters[i].style.display = 'none'; document.getElementById('letter_' + letter).style.display = 'block'
//     }
//     else for (var i = 0; i < letters.length; i++)letters[i].style.display = 'block'; var letters = document.getElementsByClassName('letter_select'); for (var i = 0; i < letters.length; i++)
//         letters[i].classList.remove('active'); document.getElementById('select_' + letter).classList.add('active'); if (letter == '1')
//         var letters = document.getElementsByClassName('codes')[0].classList.add('star'); else var letters = document.getElementsByClassName('codes')[0].classList.remove('star')
// }

{ /* </script> */ }