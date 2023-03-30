// scripts.js

import { company } from "./config.js";
import { year } from "./config.js";

const message = "© " + company + " (" + year + ")";
document.querySelector("footer").innerText = message;
