import Product from './product';
import User from './user';

export default class Purchase {
    id: string;
    user: Partial<User>;
    product: Product;
    date: Date;
}
