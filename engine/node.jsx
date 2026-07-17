"use strict";

const path = require("node:path");
const fs = require("node:fs");

/**
 * Resolve the library directory.
 */
const LIB_DIR = path.resolve(
  path.dirname(fs.realpathSync(__filename)),
  "../lib"
);

/**
 * Load math modules.
 */
const simpleMath = require(path.join(LIB_DIR, "simple_math.js"));
const advancedMath = require(path.join(LIB_DIR, "advanced_math.js"));

/**
 * Math API
 */
const MathKit = {
  // Basic operations
  addition: simpleMath.addition,
  subtraction: simpleMath.subtraction,
  add: simpleMath.addition,
  subtract: simpleMath.subtraction,

  // Advanced operations
  multiplication: advancedMath.multiplication,
  division: advancedMath.division,
  fibonacci: advancedMath.fibonacci,
  multiply: advancedMath.multiplication,
  divide: advancedMath.division,

  /**
   * Returns all available exported functions.
   * @returns {string[]}
   */
  list() {
    return Object.keys(this).filter(
      (key) => typeof this[key] === "function" && key !== "list"
    );
  },

  /**
   * Returns the package version if available.
   * @returns {string|null}
   */
  version() {
    try {
      return require("../package.json").version;
    } catch {
      return null;
    }
  }
};

// Freeze the API to prevent modification.
module.exports = Object.freeze(MathKit);
