import Product from './product';

export default class Purchase {
    id: string;
    user: {
        id: string;
        username: string;
    };
    product: Product;
    date: Date;
}
