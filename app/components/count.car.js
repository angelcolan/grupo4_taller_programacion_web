import Component from "../pau/component";
import store from '../shared/data-access/app-store/index';

export default class CountCar extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('#qtty-items-car')
        });
    }

    render() {
        this.element.innerHTML = `${store.state.car?.length}`;
    }
}
