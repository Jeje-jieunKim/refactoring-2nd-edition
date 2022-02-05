export function createStatementData(invoice, plays) {
  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;

  /* 각 공연의 정보를 중간 데이터 구조에 채워주는 함수 */
  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((acc, cur) => acc + cur.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((acc, cur) => acc + cur.volumeCredits, 0);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  return new PerformanceCalculator(aPerformance, aPlay);
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;

    switch (this.play.type) {
      case 'tragedy':
        result = 40_000;

        if (this.performance.audience > 30) {
          result += 1_000 * (this.performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30_000;

        if (this.performance.audience > 20) {
          result += 10_000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);

    if ('comedy' === this.play.type) {
      result += Math.floor(this.performance.audience / 5);
    }

    return result;
  }
}
