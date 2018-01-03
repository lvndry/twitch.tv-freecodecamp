let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
let api = "https://wind-bow.glitch.me/twitch-api";
let site = "https://www.twitch.tv/";
let table = $("table");

function getStatus(type, name) {
  return fetch(api + "/" + type + "/" + name, {
    method: "GET",
    mode: "cors"
  }).then(resp => {
    if (resp.status != 200) {
      console.log("Looks like there is a problem. Status code: " + resp.status);
      return;
    }
    return resp.json().then(json => {
      return (json.stream === null) ? "Offline" : "Online";
    });
  });
}

/**
 * Arguements: type; string, "stream", "user", "channels"
 *             channels; array of channels, users, streams
 */
function getChannels(type, channels) {
  $.each(channels, function(index, name) {
    let promise = getStatus(type, name);
    promise.then(function(s) {
      let tr = $("<tr>");
      let chn = $("<td>");
      let status = $("<td>");
      chn.text(name);
      status.text(s);
      tr.addClass(s.toLowerCase());
      tr.append(chn);
      tr.append(status);
      table.append(tr);
    })
  });
  $(".channels").append(table);
}

$(".status").click(function(event) {
  let st = event.target.innerHTML.toLowerCase();
  if(st !== "all"){
    st = "." + st;
    $("tr").hide();
    $(st).show();
  }
  else $("tr").show();
});

$(document).ready(function() {
  getChannels("streams", channels);
});
