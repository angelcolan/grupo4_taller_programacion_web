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
        this.element.style.display = 'flex';

        if (!store.state.car?.length) {
            this.element.style.display = 'none';
        }
        this.element.innerHTML = `${store.state.car?.length}`;
    }
}
