import "./styles/style.scss";

import { createSlider } from "./scripts/slider.js";
import { createCalendar } from "./scripts/calendar";
import { createModal } from "./scripts/modal";
import { gsap } from "gsap";

createSlider();
createCalendar();
createModal();

gsap.from(".header", { duration: 1, y: -30 });
gsap.from(".info__text-container", { duration: 1, x: -30 });
gsap.from(".info__slider-window", { duration: 1, x: 30 });
gsap.from(".calendar-affiche", { duration: 1, y: 30 });
