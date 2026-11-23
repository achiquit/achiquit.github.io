

// Load the header HTML before cloning the site menu
$("#header").load("/header.html", function() {
    // Hamburger menu to X animation
    const toggleMenu = document.querySelector('#toggleMenu');
    toggleMenu.onclick = () => {
      toggleMenu.classList.toggle("hamburger-toggle");
    };

    // Mobile nav menu toggle
    document.getElementById("toggleMenu").addEventListener("click", function () {
        const navMenu = document.getElementById("navMenu");
        if (navMenu.classList.contains("hidden")) {
            // Show the menu
            navMenu.classList.remove("hidden", "opacity-0", "scale-95");
            navMenu.classList.add("opacity-100", "scale-100");
            main.classList.add("blur-sm");
        } else {
            // Hide the menu
            navMenu.classList.add("opacity-0", "scale-95");
            navMenu.classList.remove("opacity-100", "scale-100");
            setTimeout(() => {
                navMenu.classList.add("hidden");
            }, 600); // Match the duration of the transition
            main.classList.remove("blur-sm");
        }
    });

    // Nested dropdowns - NESTED DROPDOWN CODE MADE WITH AI
    const hoverNav = window.matchMedia("(min-width: 1024px) and (hover: hover)");

    function getDropdownParts(item) {
        return {
            button: item.querySelector(":scope > div > .has-children"),
            dropdown: item.querySelector(":scope > .dropdown")
        };
    }

    function closeDropdown(item) {
        const { button, dropdown } = getDropdownParts(item);
        if (!button || !dropdown) return;

        Array.from(dropdown.children)
            .filter(child => child.classList.contains("dropdown-item"))
            .forEach(closeDropdown);

        button.setAttribute("aria-expanded", "false");
        const menu = $(dropdown).stop(true, true);
        if (!menu.hasClass("hidden")) {
            menu.slideUp("medium", function () {
                this.classList.add("hidden");
            });
        }
    }

    function openDropdown(item) {
        const { button, dropdown } = getDropdownParts(item);
        if (!button || !dropdown) return;

        if (item.parentElement === topLevelMenu) {
            Array.from(item.parentElement.children)
                .filter(sibling => sibling !== item && sibling.classList.contains("dropdown-item"))
                .forEach(closeDropdown);
        }

        const menu = $(dropdown).stop(true, true);
        if (menu.hasClass("hidden")) {
            menu.removeClass("hidden").hide();
        }
        menu.slideDown("medium");
        button.setAttribute("aria-expanded", "true");
    }

    const topLevelMenu = document.querySelector("#navMenu > ul");
    document.querySelectorAll("#navMenu .dropdown-item").forEach(item => {
        const { button, dropdown } = getDropdownParts(item);
        if (!button || !dropdown) return;

        const isTopLevel = item.parentElement === topLevelMenu;
        button.type = "button";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-haspopup", "true");

        if (isTopLevel) {
            item.addEventListener("mouseenter", () => {
                if (hoverNav.matches) openDropdown(item);
            });
            item.addEventListener("mouseleave", () => {
                if (hoverNav.matches) closeDropdown(item);
            });
        }

        item.addEventListener("focusin", event => {
            if (event.target.matches(":focus-visible")) openDropdown(item);
        });
        if (isTopLevel) {
            item.addEventListener("focusout", event => {
                if (!item.contains(event.relatedTarget) && !(hoverNav.matches && item.matches(":hover"))) {
                    closeDropdown(item);
                }
            });
        }
        button.addEventListener("click", event => {
            if ((isTopLevel && hoverNav.matches) || event.detail === 0 || dropdown.classList.contains("hidden")) {
                openDropdown(item);
            } else {
                closeDropdown(item);
            }
        });
    });
});

// Load the footer HTML
$("#footer").load("/footer.html", function() {
    footerInit();
    randomLineGenerator('/quotes.txt', '#quote');
});

// Calculating years since a certain date (for About Me page)
function yearsSinceDate(dateString) {
  const now = new Date();
  const pastDate = new Date(dateString);
  let years = now.getFullYear() - pastDate.getFullYear();

  if (now.getMonth() < pastDate.getMonth() ||
      (now.getMonth() === pastDate.getMonth() && now.getDate() < pastDate.getDate())) {
    years--;
  }
  return years;
}
$(document).ready(function() {
  $('.date-count').each(function() {
    const dateString = $(this).data('date');
    const years = yearsSinceDate(dateString);
    $(this).text(years);
  });
});

// Resume categories between Outdoors and Tech/Customer Service
$("#outdoors").click(function () {
    $(".outdoors").slideToggle('medium');
    $(this).toggleClass("text-emerald-300");
});
$("#tech").click(function () {
    $(".tech").slideToggle('medium');
    $(this).toggleClass("text-emerald-300");
});

// Salve page dropdowns
$("#ogbutton").click(function () {
    $(".ogcontent").slideToggle('medium');
});
$("#tablemountainbutton").click(function () {
    $(".tablemountaincontent").slideToggle('medium');
});

// Make images in color only when they are entirely in the viewport on mobile only
$(window).on('scroll resize',
function() {
    if($(window).width() < 1024) {
        $('.color-scroll-sm').each(function() {
            var element = $(this);
            var elementTop = element.offset().top;
            var elementBottom = elementTop + element.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
                // The element is fully visible
                element.removeClass("grayscale");
            } else {
                // The element is not fully visible
                element.addClass("grayscale");
            }
        });
    }
});

// Make images in color only when they are entirely in the viewport on tablet only
$(window).on('scroll resize',
function() {
    if($(window).width() < 1024) {
        if($(window).width() > 767) {
            $('.color-scroll-md').each(function() {
                var element = $(this);
                var elementTop = element.offset().top;
                var elementBottom = elementTop + element.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
                    // The element is fully visible
                    element.removeClass("grayscale");
                } else {
                    // The element is not fully visible
                    element.addClass("grayscale");
                }
            });
        }
    }
});

// Make images in color only when they are entirely in the viewport at all times
$(window).on('scroll resize',
function() {
    $('.color-scroll').each(function() {
        var element = $(this);
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
            // The element is fully visible
            element.removeClass("grayscale");
        } else {
            // The element is not fully visible
            element.addClass("grayscale");
        }
    });
});