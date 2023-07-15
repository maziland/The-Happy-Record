// Initialize and add the map
let map;

async function initMap() {
    const centerPos = { lat: 31.881125, lng: 34.736915 };

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at The Happy Record
    map = new Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 32.071980, lng: 34.804883 },
        mapId: "THR_MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: centerPos,
        title: 'The Happy Record'
    });

    const marker2 = new AdvancedMarkerElement({
        map: map,
        position: { lat: 32.311905, lng: 34.855414 },
        title: 'The Happy Record'
    });

}

initMap();