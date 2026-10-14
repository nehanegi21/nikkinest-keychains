
/* Mom & Sis ❤️ Website JavaScript */

/* Snowflakes */
var sf = null;

if (typeof Snowflakes !== "undefined") {
    sf = new Snowflakes({
        color: "#ffd700",
        minSize: 20
    });
}

/* Personalize the name using ?name=Mom */
var url = new URL(window.location.href);
var customName = url.searchParams.get("name");

if (customName) {
    var nameElement = document.getElementById("name");

    if (nameElement) {
        nameElement.textContent = customName;
    }

    var naeElement = document.getElementById("nae");

    if (naeElement) {
        naeElement.textContent = customName;
    }
}

/* Gift button: reveal the message and play music */
if (window.jQuery) {
    $(".main").hide();

    $("#play").on("click", function () {
        $(".loader").fadeOut(1500);
        $(".main").fadeIn("slow");

        if (sf && typeof sf.destroy === "function") {
            sf.destroy();
        }

        $(".balloon-border").stop(true).animate({
            top: "-500px"
        }, 8000);

        var audio = document.querySelector(".song");

        if (audio) {
            audio.play().catch(function () {
                console.log("Music playback requires user interaction.");
            });
        }
    });
}

/* Typing messages */
if (
    typeof Typed !== "undefined" &&
    document.getElementById("typed")
) {
    new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 30,
        backSpeed: 10,
        loop: true
    });
}

/* Confetti animation */
(function () {
    var canvas = document.getElementById("confetti");

    if (!canvas) return;

    var ctx = canvas.getContext("2d");

    if (!ctx) return;

    var pieces = [];
    var colors = [
        "#df0049",
        "#c2185b",
        "#ffc1d6",
        "#ffd200",
        "#ffffff",
        "#00e857"
    ];

    var animationFrame = null;

    function resizeCanvas() {
        var dpr = window.devicePixelRatio || 1;

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createPiece(randomY) {
        return {
            x: Math.random() * window.innerWidth,
            y: randomY
                ? Math.random() * window.innerHeight
                : -10,
            size: Math.random() * 6 + 3,
            speedY: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.12,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        };
    }

    function drawConfetti() {
        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        for (var i = 0; i < pieces.length; i++) {
            var p = pieces[i];

            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;

            if (p.y > window.innerHeight + 10) {
                pieces[i] = createPiece(false);
                continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;

            ctx.fillRect(
                -p.size / 2,
                -p.size / 2,
                p.size,
                p.size * 0.65
            );

            ctx.restore();
        }

        animationFrame = window.requestAnimationFrame(drawConfetti);
    }

    function startConfetti() {
        if (animationFrame !== null) return;

        resizeCanvas();

        for (var i = 0; i < 100; i++) {
            pieces.push(createPiece(true));
        }

        drawConfetti();
    }

    window.addEventListener("resize", resizeCanvas);

    startConfetti();
})();
