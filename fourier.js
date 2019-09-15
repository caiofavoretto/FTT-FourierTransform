const raNumber = 41;
const periodsAmt = 3;
const PointsAmt = 200;

const fZero = raNumber * 100;
const wZero = 2 * Math.PI * fZero;
const period = (1 / fZero) / PointsAmt;

fourierTransform = (sequence, t) => {
  const functionConstant = 0.5;

  if (t > 0) {
    const constMultiplyer = (2 / Math.PI);

    let count = 1;
    let sum = 0;

    for (let i = 0; i < sequence; i++) {
      sum += ((1 / count) * Math.sin(count * wZero * t));
      count += 2;
    }

    const c = (constMultiplyer * sum) + functionConstant;
    return c;
  }

  return functionConstant;
}

calculateSequence = (sequenceAmt) => {
  let currentPeriod = 0;

  let chartSequences = [];
  for (let i = 0; i < PointsAmt * periodsAmt; i++) {
    chartSequences.push({
      x: currentPeriod,
      y: fourierTransform(sequenceAmt, currentPeriod)
    });
    currentPeriod += period;
  }
  return chartSequences;
}

generateChart = () => {
  const chartContainer = document.getElementById('Container');
  const sequencesAmt = document.getElementById('SequencesAmt').value;
  const generateAll = document.getElementById('GenerateAll').checked;

  if (sequencesAmt < 0) {
    return;
  }

  chartContainer.classList.remove('hidden');

  let dPoints = [];

  if (generateAll) {
    for (let i = 0; i <= sequencesAmt; i++) {
      dPoints.push({
        type: "line",
        dataPoints: calculateSequence(i)
      });
    }
  }
  else {
    dPoints.push({
      type: "line",
      dataPoints: window.calculateSequence(sequencesAmt)
    });
  }


  const chart = new CanvasJS.Chart("ChartContainer", {
    title: {
      text: "Transformada de Fourier"
    },
    animationEnabled: true,
    theme: "light2",
    axisY: {
      includeZero: false
    },
    data: dPoints
  });

  chart.render();
}