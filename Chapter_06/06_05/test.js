
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
    const jeollabukDoPeople = customers.filter(c => isJeollabukDo(c.address.state));
    return jeollabukDoPeople.map(c => c.name);
}

// 함수가 훨씬 더 명확하게 변경되었다.
function isJeollabukDo(stateCode) {
    return ["전주", "완주"].includes(stateCode);
}