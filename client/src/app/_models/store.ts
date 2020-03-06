interface Location {
    type: 'Point';
    coordinates: Array<number>; // longitude, latitude
}

export default class Store {
    id: string;
    name: string;
    location: Location;
}
