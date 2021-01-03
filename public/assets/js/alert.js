console.log("core-ui");
var alertList = document.querySelectorAll('.alert')
alertList.forEach(function (alert) {
  new coreui.Alert(alert)
})