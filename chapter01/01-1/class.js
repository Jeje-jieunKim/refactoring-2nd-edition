
//04-12 클래스화 하기
//인터페이스
class PerformanceCalculator {

    constructor(performance, play) {

        this.performance = performance;
        this.play = play;

    }

    //계산을 하는거 명령, 구현은 없음
    get amount() {
        throw new Error('구현 없어야함');
    }
    //포인트 계산
    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }

}
//비극
class TragedyCalculator extends PerformanceCalculator {
    //계산 구현
    get amount() {
        let amount = 40000;

        if(this.performance.audience > 30) {
            amount += 1_000 * (this.performance.audience - 30);
        }

        return amount;
    }

}
//희극
class ComedyCalculator extends PerformanceCalculator {
    //계산 구현
    get amount() {
        let amount = 30000;

        if (this.performance.audience > 20) {
            amount += 10_000 + 500 * (this.performance.audience - 20);

        }
        amount += 300 * this.performance.audience;

        return amount;
    }

    //포인트 계산 구현
    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

export function statementCreateFormat(invoice, plays) {
    const format = (_num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
            .format(_num);
    }

    const playFor = (_perf) => {
        return plays[_perf.playID];
    }



    const createPerformanceCalculator = (_perf) => {
        switch ( playFor(_perf).type) {
            case 'tragedy':
                return new TragedyCalculator(_perf,playFor(_perf));
            case 'comedy':
                return new ComedyCalculator(_perf,playFor(_perf));
                break;
            default:
                throw new Error(`알 수 없는 장르: ${ playFor(_perf).type}`);
        }
    }


    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
        const calculator = createPerformanceCalculator(perf);
        const amount = calculator.amount;
        const credits = calculator.volumeCredits;

        // 청구 내역을 출력한다.
        result += `${playFor(perf).name}: ${format(amount / 100)} ${perf.audience}석\n`;

        totalAmount += amount;
        volumeCredits += credits;
    }
    result += `총액 ${format(totalAmount / 100)}\n`;
    result += `적립 포인트 ${volumeCredits}점\n`;


    return result;
}

