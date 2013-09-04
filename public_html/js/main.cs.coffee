$ =>
  console.log 'Go Go Go'
  g = new Dygraph graph, [[0,0]], 
    title: 'Interface In Octets Rate as Counter',
    ylabel: 'Temperature (F)',
    legend: 'always',
    labelsDivStyles: { 'textAlign': 'right' },
    showRangeSelector: true
    
  $.ajax
    type: 'POST'
    url: 'http://192.168.30.184:4242/api/query'
    processData: false
    dataType: 'json'
    data: JSON.stringify
      start: '1d-ago'
      end: '1s-ago'
      queries: [
        aggregator: 'avg'
        rate: false
        rateOptions: 
          counter: false
          
        metric: 'if.ifInOctets'
        tags:
          foreignSource: 'Server'
          foreignId: 'patches'
          instance: 2
      ]
    success: (data) =>
      console.log 'Got Data from TSDB', data
      
      data = for date, value of data[0].dps
        [(new Date date * 1000), value]
      
      console.log data
      
      g.updateOptions
        'file': data
