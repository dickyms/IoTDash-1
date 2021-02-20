const socket = io();
let itemSatu = [];
let itemDua = [];
let waktu = [];
socket.on("messages", (item) => {
  itemSatu.push(item.oxygen);
  itemDua.push(item.temperature);
  waktu.push(item.waktu);
  Highcharts.chart("grafik-t1-tr", {
    chart: {
      type: "line",
      scrollablePlotArea: {
        minWidth: 767,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Oxygen (%)",
    },
    xAxis: {
      categories: waktu,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Oxygen (%)",
      },
    },
    series: [
      {
        name: "Oxygen",
        data: itemSatu,
      },
    ],
  });
  Highcharts.chart("grafik-t1-br", {
    chart: {
      type: "line",
      scrollablePlotArea: {
        minWidth: 767,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Temperature (°C)",
    },
    xAxis: {
      categories: waktu,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Temperature °C",
      },
    },
    series: [
      {
        name: "Temperature °C",
        data: itemDua,
      },
    ],
  });
});

Highcharts.chart("grafik-t1-dum1", {
  chart: {
    type: "line",
    scrollablePlotArea: {
      minWidth: 767,
      scrollPositionX: 1,
    },
  },
  title: {
    text: "Oxygen (%) Dummy Data",
  },
  xAxis: {
    categories: waktu,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Oxygen (%) Dummy Data",
    },
  },
  series: [
    {
      name: "Oxygen (%) Dummy Data",
      data: [100, 100, 100, 97, 95, 94, 92, 92, 87],
    },
  ],
});
Highcharts.chart("grafik-t1-dum2", {
  chart: {
    type: "line",
    scrollablePlotArea: {
      minWidth: 767,
      scrollPositionX: 1,
    },
  },
  title: {
    text: "Temperature (°C) Dummy Data",
  },
  xAxis: {
    categories: waktu,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Temperature °C",
    },
  },
  series: [
    {
      name: "Temperature °C - Dummy Data",
      data: [32, 32, 32, 33, 33, 34, 30, 30, 36, 30],
    },
  ],
});
