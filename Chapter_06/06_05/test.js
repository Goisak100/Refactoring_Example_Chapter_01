
const customers = [
    {
        name:  "AAA",
        address: {
            state: "전주",
        },
    },
    {
        name: "BBB",
        address: {
            state: "완주",
        },
    },
    {
        name: "CCC",
        address: {
            state: "광주",
        },
    },
]


// export가 붙은 함수는 함부로 선언을 수정하면 안 된다.
export function test() {
    const jeollabukDoPeople = customers.filter(c => isJeollabukDo(c));
    return jeollabukDoPeople.map(c => c.name);
}

function isJeollabukDo(customer) {
    return ["전주", "완주"].includes(customer.address.state);
}