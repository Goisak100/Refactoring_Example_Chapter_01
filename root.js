
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
        performance: [
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
    return renderPlainText(invoice, plays);
}

function renderPlainText(invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    for (let perf of invoice.performance) {
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;

    function playFor(performance) {
        return plays[performance.playID];
    }

    function usd(number) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(number / 100);
    }

    function amountFor(performance) {
        let result = 0;

        switch (playFor(performance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
        }

        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performance) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoice.performance) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits;
    }
    
    function volumeCreditsFor(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        if ("comedy" === playFor(performance).type) {
            result += Math.floor(performance.audience / 5);
        }
        return result;
    }
}