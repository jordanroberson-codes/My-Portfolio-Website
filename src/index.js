//Typewrite Effect//

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//face generator//
var factPlaceholder = document.getElementById("fun-fact");
var showFact = document.getElementById("show-fact");

var funFacts = [
  "I have been a nurse practitioner for almost 5 years and was previously a nurse for 4 years before that.",
  "I am happily married to my highschool sweetheart and we have 2 beautiful kids, a boy and a girl.",
  "I love learning and challenges,which is usually why I am always enrolled in some kind of class.",
  "My favorite sports are soccer and tennis",
  "I prefer mac over windows -- all day everyday.  🍎",
  "I am a perfectionist and constantly feel that there are things to improve on in all aspects of life.",
  "I am 31 years old and live in Florida.",
  "Surprisingly I HATE the beach but love being in the ocean.",
];

var factNumber;

function randomFact() {
  return funFacts[factNumber];
}

showFact.addEventListener("click", function () {
  factNumber = Math.floor(Math.random() * 5);
  factPlaceholder.textContent = randomFact();
});
