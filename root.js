
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
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    return renderPlainText(statementData);

    function enrichPerformance(performance) {
        const result = Object.assign({}, performance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(performance) {
        return plays[performance.playID];
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

    function volumeCreditsFor(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        if ("comedy" === performance.play.type) {
            result += Math.floor(performance.audience / 5);
        }
        return result;
    }

    function totalAmount(statementData) {
        let result = 0;
        for (let perf of statementData.performances) {
            result += perf.amount;
        }
        return result;
    }
}

function renderPlainText(statementData) {
    let result = `청구 내역 (고객명: ${statementData.customer})\n`;
    for (let perf of statementData.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(statementData.totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function usd(number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(number / 100);
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of statementData.performances) {
            volumeCredits += perf.volumeCredits;
        }
        return volumeCredits;   
    }
}