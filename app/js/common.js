if (localStorage.name && localStorage.email && localStorage.phone)  {
  // запись сохраненных данных сразу в поля, если надо
  $('input[name="name"]').val(localStorage.name);
  $('input[type="email"]').val(localStorage.email);
  $('input[type="tel"]').val(localStorage.phone);
}

$(function() {
  $("[name=send]").click(function (e) {
   var btn = $(this);
   var form = $(this).closest('form');

   $(":input.error").removeClass('error');
   $(".allert").remove();

   var error;
   var ref = btn.closest('form').find('[required]');
   var msg = btn.closest('form').find('input, textarea, select');
   var send_btn = btn.closest('form').find('[name=send]');
   var send_adress = btn.closest('form').find('[name=send_adress]').val();
   var send_options = btn.closest('form').find('[name=campaign_token]');;
   var formType = btn.closest('form').find('[name=form_type]').val();
   var redirect = btn.closest('form').find('[name=redirect]').val();
   var goal = btn.closest('form').find('[name=goal]').val();
   var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';

   localStorage.name = form.find('input[name="name"]').val();
   localStorage.email = form.find('input[type="email"]').val();
   localStorage.phone = form.find('input[type="tel"]').val();


   $(ref).each(function() {
    if ($(this).val() == '') {
      var errorfield = $(this);
      $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span>' + alertImage + '</div>');
      error = 1;
      $(":input.error:first").focus();
      return;
    } else {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if ($(this).attr("type") == 'email') {
        if (!pattern.test($(this).val())) {
          $("[name=email]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
      var patterntel = /^()[- +()0-9]{9,18}/i;
      if ($(this).attr("type") == 'tel') {
        if (!patterntel.test($(this).val())) {
          $("[name=phone]").val('');
          $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите номер телефона в формате +3809999999</span>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
      }
    }
  });
   if (!(error == 1)) {
    $(send_btn).each(function() {
      $(this).attr('disabled', true);
    });
    $.ajax({
      type: 'POST',
      url: send_adress,
      data: msg,
      success: function() {
        $('form').trigger("reset");
        setTimeout(function() {
          $("[name=send]").removeAttr("disabled");
        }, 1000);
        // Настройки модального окна после удачной отправки
        dataLayer.push({
          'form_type': formType,
          'event': "form_submit"
        });
        yaCounter41024484.reachGoal(goal);
      },
      error: function(xhr, str) {
        dataLayer.push({
          'form_type': formType,
          'event': "form_submit"
        });
        yaCounter41024484.reachGoal(goal);
        $('div.md-show').removeClass('md-show');
        // Отправка в базу данных
        $.ajax({
         type: 'POST',
         url: 'db/registration.php',
         dataType: 'json',
         data: form.serialize(),
         success: function(response) {
           console.info(response);
           console.log(form.serialize());
           if (response.status == 'success') {
            $('form').trigger("reset");
            window.location.href = 'http://allinsol.com/bootcamp/success/';
          }
        }
      });
      }
    });

  }
  return false;
})
});





 // Smooth scroll to anchor

 $('.scroll').click(function(){
  $('html, body').animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 1000);
  return false;
});

//  INPUT TEL MASK

jQuery(function($){
 $("input[type='tel']").mask("+99 (999) 999-9999");
});



// Scroll BAR

$(window).scroll(function() {
    // calculate the percentage the user has scrolled down the page
    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

    $('.bar-long').css('width', scrollPercent +"%"  );

  });

// Program Acordion

$(".item").click(function(event) {
  $(this).toggleClass('open').children('.item_hidden_info').slideToggle();
});

// Parallax

$(window).scroll(function() {

  var st = $(this).scrollTop() /100;
  var tt = $(this).scrollTop() /100;

  $(".paralax_letter").css({
    "transform" : "translate3d(0px, " + st  + "%, .0px)",
    "-webkit-transform" : "translate3d(0px, " + st  + "%, .0px)",
    "-ms-transform" : "translate3d(0px, " + st  + "%, .0px)"
  });

});

//  UP BUTTON

$( document ).ready(function() {
  $('#scrollup img').mouseover( function(){
    $( this ).animate({opacity: 0.65},100);
  }).mouseout( function(){
    $( this ).animate({opacity: 1},100);
  });

  $(window).scroll(function(){
    if ( $(document).scrollTop() > 0 ) {
      $('#scrollup').fadeIn('slow');
    } else {
      $('#scrollup').fadeOut('slow');
    }
  });

  $('#scrollup').click(function() {
    $('body,html').animate({scrollTop:0},1000);
  });
});

// PREVENT SCROLLING

$('*').click(function() {
  var modal= $(".md-modal");
  if( modal.hasClass('md-show')){
    $("body").addClass('unscroll')
  } else {
    $("body").removeClass('unscroll');
  }
});

// Paralax

! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    "use strict";
    if (n(1), window.innerWidth > 1099) {
        for (var r = "undefined" != typeof document ? document.createElement("p").style : {}, o = ["O", "ms", "Moz", "Webkit"], i = {}, a = function(t) {
                if (t = t.replace(/-([a-z])/g, function(t, e) {
                        return e.toUpperCase()
                    }), void 0 !== r[t]) return t;
                for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = o.length; n--;) {
                    var i = o[n] + e;
                    if (void 0 !== r[i]) return i
                }
                return t
            }, s = (function(t) {
                return t in i ? i[t] : i[t] = a(t)
            }), u = {
                byMatcher: function(t, e, n) {
                    void 0 === n && (n = {}); {
                        if (t && t !== document) return e(t) ? t : this.byMatcher(t.parentNode, e, n);
                        if (n.throwOnMiss) throw new Error("Expected to find parent node, but none was found.")
                    }
                },
                byClassName: function(t, e, n) {
                    return this.byMatcher(t, function(t) {
                        return t.classList.contains(e)
                    }, n)
                }
            }, f = [], c = document.querySelectorAll("[data-offset]"), d = 0; d < c.length; d++) {
            var l = c[d],
                m = l;
            null != l.dataset.container && (m = u.byClassName(l, l.dataset.container)), l.style.willChange = "transform", f.push({
                element: l,
                transform: parseFloat(l.dataset.offset, 10),
                container: m,
                mouse: null != l.dataset.mouse
            })
        }
        var p = 0,
            h = 0,
            w = function(t, e) {
                for (var n = window.innerHeight, r = window.innerWidth, o = 0; o < f.length; o++) {
                    var i = f[o];
                    if (i.mouse && e || !e) {
                        var a = i.container.getBoundingClientRect();
                        if (a.bottom > -n && a.top < 2 * n) {
                            var u = 100 * h + a.top + a.height / 2,
                                c = (u - n / 2) / i.transform,
                                d = 0;
                            if (i.mouse) {
                                var l = 100 * p + a.left + a.width / 2;
                                d = (l - r / 2) / i.transform
                            }
                            i.element.style[s("transform")] = "translate(" + d + "px, " + c + "px)"
                        }
                    }
                }
                if (t)
                    for (var o = 0; o < f.length; o++) {
                        var i = f[o],
                            a = i.container.getBoundingClientRect(),
                            m = a.top + a.height / 2,
                            w = (m - n / 2) / i.transform;
                        i.element.style[s("transform")] = "translate(0px, " + w + "px)"
                    }
            };
        window.addEventListener("mousemove", function(t) {
            p = t.clientX / window.innerWidth * 2 - 1, h = t.clientY / window.innerHeight * 2 - 1, requestAnimationFrame(function() {
                w(!1, !0)
            })
        }), w(!0), setTimeout(function() {
            w()
        }), window.addEventListener("scroll", function() {
            w()
        }), window.addEventListener("resize", function() {
            w()
        })
    }
}, function(t, e) {}]);

// Perfect Pxel

// $('body').each(function() {
//   var body = $(this);
//   var img_url = $(this).data('img');
//   var img = new Image();
//   img.src = img_url;
//   img.onload = function(){
//     var ppbox = '<div id="pp" style="background: url('+img_url+') no-repeat 50% 0%;top:0;width:100%;position:absolute;z-index:1000000;opacity:0.5;height:'+img.height+'px"></div>';
//     var ppbtn = '<button onclick="myOff()" id="ppbtn" style="position:fixed;top:0;right:0;z-index:1000001">ON</button>'
//     body.append(ppbox);
//     body.append(ppbtn);
//   };
// });
// function myOff() {
//   var ppbtntext = $('#ppbtn').text();
//   if (ppbtntext == 'ON') {
//     $('#ppbtn').text('OFF');
//     $('#pp').css('display', 'none');
//   } else {
//     $('#ppbtn').text('ON');
//     $('#pp')        .css({
//       ' z-index' : '1000000',
//       display: 'block'
//     });

//   }
// }

// $('html').keydown(function(){
//   var ppbtntext = $('#ppbtn').text();
//   if (event.keyCode == 81) {
//     if (ppbtntext == 'ON') {
//       $('#ppbtn').text('OFF');
//       $('#pp').css('display', 'none');
//     } else {
//       $('#ppbtn').text('ON');
//       $('#pp')        .css({
//         ' z-index' : '1000000',
//         display: 'block'
//       });
//     }
//   }
// });
