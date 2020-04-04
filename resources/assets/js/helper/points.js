import Axios from './axios';
import State from './store';

export default class Points {
    points = 0;

    constructor() {
        this.axios = new Axios();
    }

    get() {
        let that = this;

        this.axios.get('/chains/points').then(function(response) {
            that.points =  response.data.points;
        });

        State.updateState({
            current_points: this.points,
        });
    }

}