"use strict";
// Inspired By
// https://codepen.io/abeatrize/pen/LJqYey
var _a, _b;
// Bongo Cat originally created by @StrayRogue and @DitzyFlama
const ID = "bongo-cat";
const s = (selector) => `#${ID} ${selector}`;
const notes = document.querySelectorAll(".note");
for (let note of notes) {
    (_a = note === null || note === void 0 ? void 0 : note.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(note.cloneNode(true));
    (_b = note === null || note === void 0 ? void 0 : note.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(note.cloneNode(true));
}
const music = { note: s(".music .note") };
const cat = {
    pawRight: {
        up: s(".paw-right .up"),
        down: s(".paw-right .down"),
    },
    pawLeft: {
        up: s(".paw-left .up"),
        down: s(".paw-left .down"),
    },
};
const style = getComputedStyle(document.documentElement);
const green = style.getPropertyValue("--green");
const pink = style.getPropertyValue("--pink");
const blue = style.getPropertyValue("--blue");
const orange = style.getPropertyValue("--orange");
const cyan = style.getPropertyValue("--cyan");
gsap.set(music.note, { scale: 0, autoAlpha: 1 });
const animatePawState = (selector) => gsap.fromTo(selector, { autoAlpha: 0 }, {
    autoAlpha: 1,
    duration: 0.01,
    repeatDelay: 0.19,
    yoyo: true,
    repeat: -1,
});
const tl = gsap.timeline();
tl.add(animatePawState(cat.pawLeft.up), "start")
    .add(animatePawState(cat.pawRight.down), "start")
    .add(animatePawState(cat.pawLeft.down), "start+=0.19")
    .add(animatePawState(cat.pawRight.up), "start+=0.19")
    .timeScale(1.6);
gsap.from(".terminal-code line", {
    drawSVG: "0%",
    duration: 0.1,
    stagger: 0.1,
    ease: "none",
    repeat: -1,
});
// typing for pipe function doesn't seem to be working for usage when partially applied?
const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
const noteEls = noteElFn(music.note);
const numNotes = noteEls.length / 3;
const notesG1 = noteEls.splice(0, numNotes);
const notesG2 = noteEls.splice(0, numNotes);
const notesG3 = noteEls;
const colorizer = gsap.utils.random([green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
const rotator = gsap.utils.random(-50, 50, 1, true);
const dir = (amt) => `${gsap.utils.random(["-", "+"])}=${amt}`;
const animateNotes = (els) => {
    els.forEach((el) => {
        gsap.set(el, {
            stroke: colorizer(),
            rotation: rotator(),
            x: gsap.utils.random(-25, 25, 1),
        });
    });
    return gsap.fromTo(els, {
        autoAlpha: 1,
        y: 0,
        scale: 0,
    }, {
        duration: 2,
        autoAlpha: 0,
        scale: 1,
        ease: "none",
        stagger: {
            from: "random",
            each: 0.5,
        },
        rotation: dir(gsap.utils.random(20, 30, 1)),
        x: dir(gsap.utils.random(40, 60, 1)),
        y: gsap.utils.random(-200, -220, 1),
        onComplete: () => animateNotes(els),
    });
};
tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), ">0.05").add(animateNotes(notesG3), ">0.25");

document.addEventListener("click", function()
{
    window.location="./main.html";
});

//countdown

(function() {
    var animation = {
      newYear: document.querySelector(".new-year"),
      range: function(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      get period() {
        var dateFuture = new Date(new Date().getFullYear() + 1, 0, 1);
        var dateNow = new Date();
        var seconds = Math.floor((dateFuture - (dateNow))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        return {
          year: new Date().getFullYear() + 1,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      },
      element: function(parent, type, className, html) {
        var element = document.createElement(type);
        element.className = className;
        if (typeof html !== "undefined") element.innerHTML = html;
        parent.appendChild(element);
        return element;
      },
      year: function(className) {
        var timeline = new TimelineMax();
        var year = animation.element(animation.newYear, "div", className);
        for (var i=0; i<=String(animation.period.year).length-1; i++) {
          var digit = animation.element(year, "div", "digit", String(animation.period.year).substr(i, 1));
          digit.style.top = (0 - (digit.clientHeight * 2)) + "px";
          timeline
            .to(digit, 0.5, {top: 0, opacity: 1, ease: Bounce.easeOut});
        }
        return year;
      },
      animate: function() {
        var year1 = animation.year("year year1");
        var controls = animation.element(animation.newYear, "div", "controls");
        var days = animation.element(controls, "div", "control days");
        var hours = animation.element(controls, "div", "control hours");
        var minutes = animation.element(controls, "div", "control minutes");
        var seconds = animation.element(controls, "div", "control seconds");
        animation.controls = {
          controls: controls,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        };
        animation.render();
        var triangles = animation.element(year1, "div", "triangles");
        var fullTimeline = new TimelineMax();
        var triangleStorage = [];
        for (var i=0; i<=50-1; i++) {
          var timeline = new TimelineMax({repeat: -1});
          var triangle = animation.element(triangles, "div", "triangle");
          triangle.style.top = -50 + "px";
          var time = animation.range(0, 100) / 100;
          var duration = 1;
          var direction = animation.range(1, 2) == 1 ? -1 : 1;
          timeline
            .set(triangle, {scale: animation.range(10, 20) / 10}, time)
            .to(triangle, duration * 0.5, {opacity: 1}, time)
            .to(triangle, duration, {top: "200%", rotationZ: animation.range(180, 360) * direction, rotationX: animation.range(180, 360) * direction}, time)
            .to(triangle, duration * 0.5, {opacity: 0}, time + (duration * 0.5));
          fullTimeline.add(timeline, 0);
          triangleStorage.push(triangle);
        }
        var previousWidth = 0;
        var checkWidth = function() {
          if (Math.abs(previousWidth - year1.clientWidth) > 1) {
            for (var i=0; i<=triangleStorage.length-1; i++) {
              triangleStorage[i].style.left = (-5 + animation.range(0, year1.clientWidth)) + "px";
            }
            previousWidth = year1.clientWidth;
          }
          setTimeout(checkWidth, 100);
        }
        checkWidth();
        return new TimelineMax()
          .to(days, 0.5, {top: 0, opacity: 1}, 0)
          .to(hours, 0.5, {top: 0, opacity: 1}, 0.25)
          .to(minutes, 0.5, {top: 0, opacity: 1}, 0.5)
          .to(seconds, 0.5, {top: 0, opacity: 1}, 0.75)
          .set(triangles, {opacity: 1}, 3)
          .add(fullTimeline, 3);
      },
      plural: function(property) {
        var period = animation.period;
        if (String(period[property]).length <= 1) period[property] = "0" + period[property];
        return Number(period[property]) > 1 ? period[property] + " " + property : period[property] + " " + property.substr(0, property.length-1);
      },
      render: function() {
        animation.controls.seconds.innerHTML = animation.plural("seconds");
        animation.controls.minutes.innerHTML = animation.plural("minutes");
        animation.controls.hours.innerHTML = animation.plural("hours");
        animation.controls.days.innerHTML = animation.plural("days");
        requestAnimationFrame(animation.render);
      }
    };
    animation.animate();
  })();