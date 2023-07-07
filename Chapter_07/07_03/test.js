class Priority {
    constructor(value) {
        if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value)) {
            this._value = value;
        } else {
            throw new Error(`유효하지 않은 값: ${value}`);
        }
    }

    toString() { return this._value; }
    get _index() { return Priority.legalValues().findIndex(s => s === this._value) }
    static legalValues() { return ['low', 'normal', 'high', 'rush']; }
    higherThan(other) { return this._index > other._index; }
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
    return orders.filter(o => o.priority.higherThan(new Priority('normal'))).map(o => o.priority.toString());
}