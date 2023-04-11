//switch 에 있는 로직 함수로 빼주기
import {re} from "@babel/core/lib/vendor/import-meta-resolve.js";

export function statementRemoveSwitch(invoice, plays) {

  const calculateTragedyAmount = (_perf) => {
    let amount = 40000;

    if (_perf.audience > 30) {
      amount += 1_000 * (_perf.audience - 30);
    }

    return amount;
  }

  const calculateComedyAmount = (_perf) => {
    let amount = 30000;

    if (_perf.audience > 20) {
      amount += 10_000 + 500 * (_perf.audience - 20);
    }
    amount += 300 * _perf.audience;

    return amount;
  }

  const calculateAmount = (_perf) => {
    const play = plays[_perf.playID];
    let amount = 0;

    switch (play.type) {
      case 'tragedy':
        amount = calculateTragedyAmount(_perf);
        break;
      case 'comedy':
        amount = calculateComedyAmount(_perf);
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return amount;

  }

  const calculateVolumeCredits = (_perf) => {
    let credits = Math.max(_perf.audience - 30, 0);

    if (plays[_perf.playID].type === 'comedy') {
      credits += Math.floor(_perf.audience / 5);
    }

    return credits;
  };


  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
      .format;

  for (let perf of invoice.performances) {
    const amount = calculateAmount(perf);
    const credits = calculateVolumeCredits(perf);

    // 청구 내역을 출력한다.
    result += `${plays[perf.playID].name}: ${format(amount / 100)} ${perf.audience}석\n`;

    totalAmount += amount;
    volumeCredits += credits;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}

//임의 변수 질의함수로 바꾸기(play 제거)
export function statementRemovePlay(invoice, plays) {

  const playFor = (_perf) => {
    return plays[_perf.playID];
  }

  const calculateTragedyAmount = (_perf) => {
    let amount = 40000;

    if (_perf.audience > 30) {
      amount += 1_000 * (_perf.audience - 30);
    }

    return amount;
  }

  const calculateComedyAmount = (_perf) => {
    let amount = 30000;

    if (_perf.audience > 20) {
      amount += 10_000 + 500 * (_perf.audience - 20);

    }
    amount += 300 * _perf.audience;
    return amount;
  }

  const calculateAmount = (_perf) => {
    const play = playFor(_perf);
    let amount = 0;

    switch (play.type) {
      case 'tragedy':
        amount = calculateTragedyAmount(_perf);
        break;
      case 'comedy':
        amount = calculateComedyAmount(_perf);
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return amount;

  }

  const calculateVolumeCredits = (_perf) => {
    let credits = Math.max(_perf.audience - 30, 0);
    if (playFor(_perf).type === 'comedy') {
      credits += Math.floor(_perf.audience / 5);
    }
    return credits;
  };


  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
      .format;

  for (let perf of invoice.performances) {
    const amount = calculateAmount(perf);
    const credits = calculateVolumeCredits(perf);

    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amount / 100)} ${perf.audience}석\n`;

    totalAmount += amount;
    volumeCredits += credits;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}

//변수 인라인 하기
export function statementRemoveVar(invoice, plays) {

  const playFor = (_perf) => {
    return plays[_perf.playID];
  }

  const calculateTragedyAmount = (_perf) => {
    let amount = 40000;

    if (_perf.audience > 30) {
      amount += 1_000 * (_perf.audience - 30);
    }

    return amount;
  }

  const calculateComedyAmount = (_perf) => {
    let amount = 30000;

    if (_perf.audience > 20) {
      amount += 10_000 + 500 * (_perf.audience - 20);

    }
    amount += 300 * _perf.audience;

    return amount;
  }

  const calculateAmount = (_perf) => {
    let amount = 0;

    switch ( playFor(_perf).type) {
      case 'tragedy':
        amount = calculateTragedyAmount(_perf);
        break;
      case 'comedy':
        amount = calculateComedyAmount(_perf);
        break;
      default:
        throw new Error(`알 수 없는 장르: ${ playFor(_perf).type}`);
    }
    return amount;

  }

  const calculateVolumeCredits = (_perf) => {
    let credits = Math.max(_perf.audience - 30, 0);
    if (playFor(_perf).type === 'comedy') {
      credits += Math.floor(_perf.audience / 5);
    }
    return credits;
  };


  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
      .format;

  for (let perf of invoice.performances) {
    const amount = calculateAmount(perf);
    const credits = calculateVolumeCredits(perf);

    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amount / 100)} ${perf.audience}석\n`;

    totalAmount += amount;
    volumeCredits += credits;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}


//포맷 함수 만들기
export function statementCreateFormat(invoice, plays) {
  const format = (_num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
        .format(_num);
  }

  const playFor = (_perf) => {
    return plays[_perf.playID];
  }

  const calculateTragedyAmount = (_perf) => {
    let amount = 40000;

    if (_perf.audience > 30) {
      amount += 1_000 * (_perf.audience - 30);
    }

    return amount;
  }

  const calculateComedyAmount = (_perf) => {
    let amount = 30000;

    if (_perf.audience > 20) {
      amount += 10_000 + 500 * (_perf.audience - 20);

    }
    amount += 300 * _perf.audience;

    return amount;
  }

  const calculateAmount = (_perf) => {
    let amount = 0;

    switch ( playFor(_perf).type) {
      case 'tragedy':
        amount = calculateTragedyAmount(_perf);
        break;
      case 'comedy':
        amount = calculateComedyAmount(_perf);
        break;
      default:
        throw new Error(`알 수 없는 장르: ${ playFor(_perf).type}`);
    }
    return amount;

  }

  const calculateVolumeCredits = (_perf) => {
    let credits = Math.max(_perf.audience - 30, 0);
    if (playFor(_perf).type === 'comedy') {
      credits += Math.floor(_perf.audience / 5);
    }
    return credits;
  };


  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    const amount = calculateAmount(perf);
    const credits = calculateVolumeCredits(perf);

    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amount / 100)} ${perf.audience}석\n`;

    totalAmount += amount;
    volumeCredits += credits;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}