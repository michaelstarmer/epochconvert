
let unixInput;
let dateResult = document.getElementById('toDateResult');
let unixResult = document.getElementById('toUnixResult');

let statusBox = document.getElementById('tooltip');

// Initialize dates
initializeForms();

// Event listeners
$('#toUnixBtn').click(() => {
  unixToDate();  
});

$('.ut').keyup(function(e){
  if(e.keyCode == 13)
  {
      unixToDate();
      copyToClipboard(unixToDate());
  }
});

$('.dt').keyup(function(e){
  if(e.keyCode == 13)
  {
      dateToUnix();
      copyToClipboard(dateToUnix());
  }
});

$('#toDateBtn').click(() => {
  dateToUnix();  
});

$('#toUnixResult').click(() => {
  copyToClipboard(unixResult.textContent);
});

$('#toDateResult').click(() => {
  copyToClipboard(dateResult.textContent);
})

function unixToDate() {
  unixInput = Number(document.getElementById('ip_unix').value);
  let result = moment.unix(unixInput).format("YYYY-MM-DD HH:mm:ss");
  dateResult.innerHTML =  '<span>' + result + '</span>';
  return result;
}

function dateToUnix() {
  // Get elements
  let YYYY = document.getElementById('ip_dt_yy');
  let MM = document.getElementById('ip_dt_mm');
  let DD = document.getElementById('ip_dt_dd');
  let HH = document.getElementById('ip_dt_hh');
  let MIN = document.getElementById('ip_dt_min');
  let SEC = document.getElementById('ip_dt_sec');

  let dateString = YYYY.value + '-' + MM.value + "-" + DD.value + " " + HH.value + ":" + MIN.value + ":" + SEC.value;
  console.log("Datestring", dateString);
  let result = moment(dateString).unix();
  unixResult.innerHTML = '<span>' + result + '</span>';

  return result;
}

function initializeForms() {
  // Get elements
  let YYYY = document.getElementById('ip_dt_yy');
  let MM = document.getElementById('ip_dt_mm');
  let DD = document.getElementById('ip_dt_dd');
  let HH = document.getElementById('ip_dt_hh');
  let MIN = document.getElementById('ip_dt_min');
  let SEC = document.getElementById('ip_dt_sec');
  
  // Get value for elements
  let _YYYY = moment().format("YYYY");
  let _MM = moment().format("MM");
  let _DD = moment().format("DD");
  let _HH = moment().format("HH");
  let _mm = moment().format("mm");
  let _ss = moment().format("ss");

  // Set value for elements
  YYYY.value = _YYYY;
  MM.value = _MM;
  DD.value = _DD;
  HH.value = _HH;
  MIN.value = _mm;
  SEC.value = _ss;

  dateResult.innerHTML = '<span>' + moment().format("YYYY-MM-DD HH:mm:ss") + '</span>';
  unixResult.innerHTML = '<span>' + moment().unix() + '</span>';
}

function copyToClipboard(string) {
  
  if(!navigator.clipboard) {
    console.log("Not supported in browser.");
  }
  navigator.clipboard.writeText(string).then(() => {
    console.log("Copied to clipboard.");
    displaySuccess();
  }, (err) => {
    console.log("Could not copy text: ",err);
  });

  return true;
}

function displaySuccess() {
  statusBox.innerHTML = '<span class="tooltiptext green">Copied</span>';
  
  $(".tooltiptext").animate({fontSize: "20px"}, 200, 0, () => {
    $(".tooltiptext").animate({fontSize: "16px"}, 100, 0, setTimeout(() => {
      statusBox.innerHTML = '<span class="tooltiptext">Click to copy</span>';
    }, 1000));
  });
}