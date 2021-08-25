import './style.css'

import ArcGISMap from '@arcgis/core/Map';
import Basemap from '@arcgis/core/Basemap';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import MapView from '@arcgis/core/views/MapView';

import Recenter from './widget';

const tileLayer = new VectorTileLayer({
  url:
    "https://www.arcgis.com/sharing/rest/content/items/92c551c9f07b4147846aae273e822714/resources/styles/root.json"
});

const basemap = new Basemap ({baseLayers: [ tileLayer ]});

const map = new ArcGISMap({
  basemap
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-100.33, 43.69],
  zoom: 4
});
view.when(() => {
  const hello = new Recenter({
    view,
    initialCenter: [-100.33, 43.69]
  });
  view.ui.add(hello, "top-right");
});