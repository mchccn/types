import { construct } from "./functions/construct";
import { fn } from "./functions/fn";
import { intersection } from "./operations/intersection";
import { not } from "./operations/not";
import { union } from "./operations/union";
import { PrimitiveType } from "./types/PrimitiveType";

const primitives = Object.freeze(PrimitiveType.TYPES);

const functions = Object.freeze({ fn, construct });

const operations = Object.freeze({ union, intersection, not });

const types = Object.freeze({ ...primitives, ...functions, ...operations });

export default types;
module.exports = types;
exports.default = types;

/**
 * ! TODO LIST
 * - generics
 * - namespaces
 * - utility types
 */
