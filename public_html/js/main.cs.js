var _this = this;

$(function() {
  var g;
  console.log('Go Go Go');
  g = new Dygraph(graph, [[0, 0]], {
    title: 'Interface In Octets Rate as Counter',
    ylabel: 'Temperature (F)',
    legend: 'always',
    labelsDivStyles: {
      'textAlign': 'right'
    },
    showRangeSelector: true
  });
  return $.ajax({
    type: 'POST',
    url: 'http://192.168.30.184:4242/api/query',
    processData: false,
    dataType: 'json',
    data: JSON.stringify({
      start: '1d-ago',
      end: '1s-ago',
      queries: [
        {
          aggregator: 'avg',
          rate: false,
          rateOptions: {
            counter: false
          },
          metric: 'if.ifInOctets',
          tags: {
            foreignSource: 'Server',
            foreignId: 'patches',
            instance: 2
          }
        }
      ]
    }),
    success: function(data) {
      var date, value;
      console.log('Got Data from TSDB', data);
      data = (function() {
        var _ref, _results;
        _ref = data[0].dps;
        _results = [];
        for (date in _ref) {
          value = _ref[date];
          _results.push([new Date(date * 1000), value]);
        }
        return _results;
      })();
      console.log(data);
      return g.updateOptions({
        'file': data
      });
    }
  });
});
