class Priority {
    constructor(value) {
        this._value = value;
    }

    toString() { return this._value; }
}

class Order {
    constructor(data) {
        this._name = data.name;
        this._priority = new Priority(data.priority);
    }

    get name() { return this._name; }
    get priority() { return this._priority; }
}

const orders = [
    new Order({ name: 'A', priority: 'low' }),
    new Order({ name: 'B', priority: 'normal' }),
    new Order({ name: 'C', priority: 'high' }),
    new Order({ name: 'D', priority: 'rush' }),
]

export function test() {
    return orders.filter(o => o.priority.toString() === 'high' || o.priority.toString() === 'rush').map(o => o.priority.toString());
}