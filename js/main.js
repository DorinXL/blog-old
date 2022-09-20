$(window).on("load", function () {
    $(".loader").fadeOut();
    $(".preloader").delay(1000).fadeOut();
    if ($(".portfolio-items").length) {
        var a = $(".portfolio-items"), b = $(".portfolio-filter ul li");
        a.isotope();
        b.on("click", function () {
            b.removeClass("active");
            $(this).addClass("active");
            var c = $(this).data("filter");
            $(".portfolio-items").isotope({
                filter: c,
                hiddenStyle: {transform: "scale(.2) skew(30deg)", opacity: 0},
                visibleStyle: {transform: "scale(1) skew(0deg)", opacity: 1,},
                transitionDuration: ".5s"
            })
        })
    }
    $(".blogs-masonry").isotope({layoutMode: "moduloColumns"})
});
$(document).ready(function () {
    $(".pt-page").each(function () {
        var c = "#" + $(this).attr("id");
        new SimpleBar($(c)[0])
    });
    fitty(".header-name", {multiLine: false, maxSize: 20, minSize: 10});
    $(".nav-menu a").on("click", function () {
        if ($(".header-content.on").length) {
            $(".header-content").removeClass("on")
        }
    });
    $(".header-toggle").on("click", function () {
        $("header .header-content").toggleClass("on")
    });
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {0: {items: 2,}, 500: {items: 3,}, 700: {items: 4,}, 1000: {items: 6,},},
    });
    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {0: {items: 1,}, 800: {items: 1,}, 1000: {items: 2,},},
    });
    if ($(".skills").length > 0) {
        var b = new SimpleBar($("#resume")[0]).getScrollElement();
        $(b).on("scroll", function () {
            a()
        });
        if ($("#resume").hasClass("page-active")) {
            a()
        }
        $('a[href="#resume"]').on("click", function () {
            a()
        });

        function a() {
            $(".progress .progress-bar").each(function () {
                var c = $(this).offset().top + $(this).outerHeight();
                var d = $(window).scrollTop() + $(window).height();
                var e = $(this).data("progress-value") + "%";
                if (d > c) {
                    $(this).css({width: e});
                    $(this).find(".progress-value").animate({countNum: parseInt(e, 10)}, {
                        duration: 2000,
                        easing: "swing",
                        step: function () {
                            $(this).text(Math.floor(this.countNum) + "%")
                        },
                        complete: function () {
                            $(this).text(this.countNum + "%")
                        }
                    })
                }
            })
        }
    }
    $(".portfolio-items .image-link").magnificPopup({type: "image", gallery: {enabled: true}});
    $(".portfolio-items .video-link").magnificPopup({type: "iframe", gallery: {enabled: true}});
    ajaxPortfolioSetup($(".portfolio-items .ajax-link"), $(".ajax-portfolio-popup"));
    $("#portfolio .item figure").tilt({maxTilt: 3, glare: true, maxGlare: 0.6, reverse: true});
    if ($("#map").length) {
        initMap()
    }
    contactFormSetup()
});

function ajaxPortfolioSetup(b, a) {
    b.on("click", function (c) {
        var d = $(this).attr("href");
        if (d === "#") {
            c.preventDefault();
            return
        }
        a.find(".content-wrap .popup-content").empty();
        a.addClass("on");
        $.ajax({
            url: d, beforeSend: function () {
                a.find(".ajax-loader").show()
            }, success: function (e) {
                a.find(".content-wrap .popup-content").html(e)
            }, complete: function () {
                a.find(".ajax-loader").hide()
            }, error: function (f) {
                a.find(".ajax-loader").hide();
                a.find(".content-wrap .popup-content").html('<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>')
            }
        });
        c.preventDefault()
    });
    a.find(".popup-close").on("click", function () {
        a.removeClass("on")
    })
}

function initMap() {
    var b = $("#map").data("latitude"), c = $("#map").data("longitude"), h = $("#map").data("zoom"),
        a = new google.maps.LatLng(b, c);
    var g = [{stylers: [{saturation: -100}, {gamma: 0.8}, {lightness: 4}, {visibility: "on"}]}, {
        featureType: "landscape.natural",
        stylers: [{visibility: "on"}, {color: "#5dff00"}, {gamma: 4.97}, {lightness: -5}, {saturation: 100}]
    }];
    var e = {
        zoom: h,
        center: a,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: g
    };
    var d = new google.maps.Map(document.getElementById("map"), e);
    var f = new google.maps.Marker({position: a, map: d, title: "We are here!"})
}

function contactFormSetup() {
    $(".input__field").each(function () {
        if ($(this).val()) {
            $(this).parent(".input").addClass("input--filled")
        } else {
            $(this).parent(".input").removeClass("input--filled")
        }
    });
    $(".input__field").on("keyup", function () {
        if ($(this).val()) {
            $(this).parent(".input").addClass("input--filled")
        } else {
            $(this).parent(".input").removeClass("input--filled")
        }
    });
    $("#contact-form").on("submit", function (b) {
        b.preventDefault();
        var f = $("#cf-name").val(), c = $("#cf-email").val(), d = $("#cf-message").val(),
            a = $("#contact-form .message"), g = 0;
        $(".cf-validate", this).each(function () {
            if ($(this).val() == "") {
                $(this).addClass("cf-error");
                g += 1
            } else {
                if ($(this).hasClass("cf-error")) {
                    $(this).removeClass("cf-error");
                    if (g > 0) {
                        g -= 1
                    }
                }
            }
        });
        if (g === 0) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: {cf_name: f, cf_email: c, cf_message: d},
                dataType: "json",
                success: function (e) {
                    console.log(e);
                    showAlertBox(e.status, e.message);
                    if (e.status === 200) {
                        $("#contact-form .input__field").val("")
                    }
                },
                error: function (e) {
                    showAlertBox(e.status, e.message)
                }
            })
        }
    })
}

function showAlertBox(d, c) {
    var b = $('<div class="alert"></div>'), a = $("#contact-form .alert-container");
    if (d == 200) {
        b.addClass("alert-success").html(c);
        a.html(b)
    } else {
        b.addClass("alert-danger").html(c);
        a.html(b)
    }
    a.fadeIn(300).delay(4000).fadeOut(400)
}