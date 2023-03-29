export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
      .format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40_000;
        if (perf.audience > 30) {
          thisAmount += 1_000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30_000;

        if (perf.audience > 20) {
          thisAmount += 10_000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    volumeCredits = addPoint(perf.audience);

    volumeCredits = addAditionalPoint(play.type, perf.audience);

    printReceipt(play.name, thisAmount, perf.audience, format);

    totalAmount += thisAmount;
  }

  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}

function addPoint(_perf) {
  // 포인트를 적립한다.
  return Math.max(_perf - 30, 0);
}

function addAditionalPoint(_play, _perf) {
  // 희극 관객 5명마다 추가 포인트를 제공한다.
  if ('comedy' !== _play) {
    return;
  }
  return Math.floor( _perf / 5);
}

function printReceipt(_play, thisAmount, _pref, format) {
  // 청구 내역을 출력한다.
  let result = 0;
  result += `${_play}: ${format(thisAmount / 100)} ${_pref}석\n`;

  return result;
}
