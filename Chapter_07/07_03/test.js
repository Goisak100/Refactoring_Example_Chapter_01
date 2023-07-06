class Order {
    constructor(data) {
        this._name = data.name;
        this._priority = data.priority;
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
    return orders.filter(o => o.priority === 'high' || o.priority === 'rush').map(o => o.priority);
}



// 방금과 같은 상황에서 내가 뭘 해야 하는지 몰랐어.
// 그렇지만, 답을 알려달라고 한 게 아니라
// 내가 분명 filter를 잘못 사용하고 있는 거라 생각하고, filter 사용법을 찾아봤어.
// 이거는 스스로가 문제를 해결한 것인가? 아니면, 답을 보고 판단한 것인가?

// 컴퓨터는 거짓말을 하지 않는다. 단지, 내가 그 방법을 정확하게 인지하지 못하고 있기 때문에 문제가 발생한다.