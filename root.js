
export const plays = {
    hamlet: {
        name: "Hamlet",
        type: "tragedy",
    },
    "as-like": {
        name: "As You Like It",
        type: "comedy",
    },
    othello: {
        name: "Othello",
        type: "tragedy",
    },
}

export const invoices = [
    {
        customer: "BigCo",
        performances: [
            {
                playID: "hamlet",
                audience: 55,
            },
            {
                playID: "as-like",
                audience: 35,
            },
            {
                playID: "othello",
                audience: 40,
            },
        ]
    }
]


export default function statement(invoice, plays) {
    const statementData = {
        customer: invoice.customer,
        performances: invoice.performances.map(enrichPerformance),
    };
    return renderPlainText(statementData);

    function enrichPerformance(performance) {
        const result = Object.assign({}, performance);
        result.play = playFor(result);
        return result;
    }

    function playFor(performance) {
        return plays[performance.playID];
    }
}

// plays 매개변수를 제거했다.
// 여기에서 performance.playID를 직접 사용하지 않고, performance.play.name을 사용한다.
// 둘 모두 결과는 동일하지만, 전자는 변수를 직접 참조하는 것이고, 후자는 함수에 의해 관리하는 것이다.
// 즉, 어떤 변경사항이 생겼을 때(이름이 변경되는 등) 후자의 경우가 더욱 쉽게 관리할 수 있다.
function renderPlainText(statementData) {
    let result = `청구 내역 (고객명: ${statementData.customer})\n`;
    for (let performance of statementData.performances) {
        result += `${performance.play.name}: ${usd(amountFor(performance))} (${performance.audience}석)\n`;
    }
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function usd(number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(number / 100);
    }

    function amountFor(performance) {
        let result = 0;

        switch (performance.play.type) {
            case "tragedy":
                result = 40000;
                if (performance.audience > 30) {
                    result += 1000 * (performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (performance.audience > 20) {
                    result += 10000 + 500 * (performance.audience - 20);
                }
                result += 300 * performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${performance.play.type}`);
        }

        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let perf of statementData.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of statementData.performances) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits;
    }
    
    function volumeCreditsFor(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        if ("comedy" === performance.play.type) {
            result += Math.floor(performance.audience / 5);
        }
        return result;
    }
}