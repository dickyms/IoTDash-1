const moment = require("moment");

function formatData(dataS) {
  return {
    oxygen: dataS.oxygen,
    temperature: dataS.temperature,
    waktu: moment().format("h:mm:ss a"),
  };
}

module.exports = formatData;
