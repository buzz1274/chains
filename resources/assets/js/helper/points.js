import Axios from './axios';
import State from './store';

export default class Points {
    points = 0;

    constructor() {
        this.axios = new Axios();
    }

    get() {
        this.axios.get('/chains/points').then(function(response) {
            State.updateState({
                current_points: response.data.points,
            });
        });
    }

}