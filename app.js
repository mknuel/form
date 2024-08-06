const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");


 const tl = gsap.timeline({
		defaults: { duration: 1 },
 });

 //  line
 const start =
		"M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

 const end =
		"M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

 //  input containers
 containers.forEach((container) => {
		let input = container.querySelector(".input");
		let line = container.querySelector(".elastic-line");
		let placeholder = container.querySelector(".placeholder");

		input.addEventListener("focusin", () => {
			if (!input.value) {
				tl.fromTo(
					line,
					{
						attr: {
							d: start,
						},
					},
					{
						attr: {
							d: end,
						},
						ease: "Power2.easeOut",
						duration: 0.75,
					}
				);

				tl.to(
					line,
					{
						attr: {
							d: start,
						},

						ease: "elastic.out(3,.5)",
					},
					"<50%"
				);

				//  placeholder shift
				tl.to(
					placeholder,
					{
						top: -20,
						left: 0,
						scale: 0.6,
						duration: 0.5,
						ease: "Power2.easeOut",
					},
					"<14%"
				);
			}
		});

		//  revert back if not focused
		input.addEventListener("focusout", (e) => {
			if (!input.value) {
				gsap.to(placeholder, {
					top: 0,
					left: 0,
					scale: 1,
					duration: 0.5,
					ease: "Power2.easeOut",
				});
			}
		});

		//  validation
		input.addEventListener("input", (e) => {
			// text validation
			if (e.target.type === "text") {
				if (e.target.value?.length > 2) {
					colourize(COLOURS["correct"], line, placeholder);
				} else {
					colourize(COLOURS["wrong"], line, placeholder);
				}
			}

			// email validation
			if (e.target.type === "email") {
				if (validateEmail(e.target.value)) {
					colourize(COLOURS["correct"], line, placeholder);
				} else {
					colourize(COLOURS["wrong"], line, placeholder);
				}
			}

			// tel validation
			if (e.target.type === "tel") {
				if (validatePhone(e.target.value)) {
					colourize(COLOURS["correct"], line, placeholder);
				} else {
					colourize(COLOURS["wrong"], line, placeholder);
				}
			}
		});
 });

 function colourize(color, line, placeholder) {
		gsap.to(line, {
			stroke: color,
			duration: 0.75,
		});

		gsap.to(placeholder, { color: color, duration: 0.75 });
 }

 function validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email);
 }

 function validatePhone(phoneNumber) {
		const regex = /^\+?[1-9]\d{1,14}$/;
		return regex.test(phoneNumber);
 }

 const COLOURS = {
		correct: "#aa86cc",
		wrong: "#FE8c99",
 };

//  Checkbox animation fill
const checkbox = document.querySelector( ".checkbox" )
const fill = document.querySelector( ".checkbox-fill" )
const tick = document.querySelector( ".tick-line" )
const checkLabel= document.querySelector(".checkbox-label")

	// Get the length of the path
			var tickPath = document.querySelector(".tick-mark path");
			var pathLength = tickPath.getTotalLength();

			// Set up the initial state
			gsap.set(tickPath, {
				strokeDasharray: pathLength,
				strokeDashoffset: pathLength,
			});

const tl2 = gsap.timeline( {
    defaults: {
        duration:.5, ease:"Power2.easeOut"
    }
})

checkbox.addEventListener( "change", (e) =>
{
    console.log(e)
    if ( e.target.checked )
    {
		
			// Animate the path
            
                tl2	.to(fill, {
                        top: 0,
                    })
                    .to(
                        tickPath,
                        {
                            strokeDashoffset: 0,
                            duration: 0.65,
                        },
                        "<50%" 
                    )
                    .to(checkLabel, {
                        color: "#9867c5",
                    }, "<");
		} else
    {
			tl2.to(fill, {
				top: "120%",
				ease: "elastic.in(2,4)",
				duration: ".3",
			});

			// Animate the path
			tl2
				.to(
					tickPath,
					{
						strokeDashoffset: pathLength,
						duration: 0.25,
						ease: "Power2.easeOut",
					},
					"<50%"
				)
				.to(
					checkLabel,
					{
						color: " #777474",
					},
					"<50%"
				);
        
        // 
		}
    
})


// animating the character
gsap.set(".eye", {
    transformOrigin: "center",
    scaleY:.3
})
gsap.fromTo(".eye", {scaleY:.3}, {scaleY:1, repeat:-1, yoyo:true, duration:.5, repeatDelay:1, ease:"Power2.easeOut" })

gsap.fromTo( "#eyebrow", { y: 0 }, { y: -1, repeat: -1, yoyo: true, duration: .5, repeatDelay: 1, ease: "Power2.easeOut" } )



// submitted message
const btn = document.querySelector( "button" )
const tl3 = gsap.timeline( {
    defaults:.75, ease:"Power2.easeOut"
})


btn.addEventListener( "click", ( e ) =>
{
	e.preventDefault();

	tl3.to(".contact-right, .contact-left", {
		opacity: "0",
		y: "30",
		pointerEvents: "none",
	})

	tl3.to("form", { scale: 0.8 }, "<")
    gsap.fromTo( "#message", { opacity: 0, y: -30 }, { opacity: 1, y: 0, delay: .5 } );
    
    // hand wave

    gsap.set("#hand", {transformOrigin:"left"})
	gsap.fromTo(
		"#hand",
		{ rotation: 0, y: 0 },
		{ rotation: -10, y: 2, ease: "elastic(3, .3)", duration: 2, delay: .5 }
	);
})
