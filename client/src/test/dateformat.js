function dateformat(date) {
  const moment = require("moment-timezone");
  return moment(date).tz("Asia/Bankok").format("DD/MM/yyyy HH:mm");
}

module.exports = dateformat;
