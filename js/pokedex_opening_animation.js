const element_lid = document.getElementById("lid");
const animation_time =
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--pokedex-opening-delay"
    )
  ) * 1000;
const element_lid_children = document.getElementById(
  "pokedex_inner_container_lid"
);
const pokedex_power_led = document.getElementById("pokedex_power_led");
const pokedex_power_led_colors = { on: "blue", off: "red" };
const pokedex_power_led_colors_start = { on: "green", off: "red" };

pokedex_power_led.style.backgroundColor = pokedex_power_led_colors.off;

function OnPowerLedClicked() {
  if (!element_lid.classList.contains("pokedex_lid_open")) {
    pokedex_power_led.style.backgroundColor = pokedex_power_led_colors.on;

    element_lid.classList.remove("pokedex_lid_closed");
    element_lid.classList.add("pokedex_lid_open");

    setTimeout(() => {
      if (element_lid_children.classList.contains("nocolor"))
        if (element_lid.classList.contains("pokedex_lid_open"))
          element_lid_children.classList.remove("nocolor");
    }, animation_time / 2);
  } else if (!element_lid.classList.contains("pokedex_lid_closed")) {
    pokedex_power_led.style.backgroundColor = pokedex_power_led_colors.off;
    element_lid.classList.add("pokedex_lid_closed_animation");
    setTimeout(() => {
      element_lid.classList.remove("pokedex_lid_open");
      element_lid.classList.add("pokedex_lid_closed");
    }, animation_time);
    setTimeout(() => {
      if (!element_lid_children.classList.contains("nocolor"))
        element_lid_children.classList.add("nocolor");
    }, animation_time / 2);
    setTimeout(() => {
      element_lid.classList.remove("pokedex_lid_closed_animation");
    }, animation_time);
  }
}

function StartPokedex() {
  const start_button = document.getElementById("pokedex_start_button");
  const img_container = document.getElementById(
    "pokemon_image_animation_container"
  );
  const img = document.querySelector("img");
  if (img.id == "pokemon_image_animation") {
    img.style.opacity = 0;
    img.id = "";
    start_button.style.backgroundColor = pokedex_power_led_colors_start.off;
  } else {
    img.style.opacity = 1;
    img.id = "pokemon_image_animation";
    start_button.style.backgroundColor = pokedex_power_led_colors_start.on;
  }
}
