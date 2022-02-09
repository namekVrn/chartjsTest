const GLOBAL_TEMP = 14
const getFetch = async ()=>{
    const fetchResult = await fetch(`./ZonAnn.Ts+dSST.csv`)
    const parce = fetchResult.text();
    return parce;
}
const parseDate = (response) =>{
    return Papa.parse(response, {header: true}).data
}

const renderReduse = (parseData)=>{
    return parseData.reduce((acc, elem)=>{
        acc.year.push(elem.Year);
        acc.temp.push(Number(elem.Glob)+GLOBAL_TEMP);
        acc.tempNord.push(Number(elem.NHem)+GLOBAL_TEMP);
        return acc
    }, {year:[], temp:[], tempNord:[]})
}

const chartLoader = (renderReduse, link) =>{
    const labels = renderReduse.year;
    const data = {
    labels: labels,
    datasets: [{
      label: 'Средняя температура по планете',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: renderReduse.temp,
      fill: false,
    },{
        label: 'Средняя температура северного полушария',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: renderReduse.tempNord,
        fill: false,
      }],
  };
  const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value + " °";
                    }
                }
            }
        }
    },
  };
  const myChart = new Chart(link,
    config
  );
}

getFetch().then((response)=>{
const parseResult = parseDate(response)
const allData = renderReduse(parseResult)
const chrt = document.querySelector('.myChart').getContext('2d');
console.log(allData)
chartLoader(allData,chrt)
});

