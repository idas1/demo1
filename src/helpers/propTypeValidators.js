/**
 * Validate number between min & max
 * @param {number} min - LBound value, inclusive
 * @param {number} max - UBound value, inclusive
 * @param {boolean} [isRequired=false] - Optional. Field is required
 * @example
 * // validate value from 1 to 12
 * numberBetween(1, 12)
 * @returns {(Error|ErrorType|String)} return Error or null
 */
const numberBetween = (min, max, isRequired = false) => {
  return (props, propName, componentName) => {
    const propValue = props[propName];
    if (isRequired) {
      if (!propValue) return new Error(`Prop ${propName} is required on ${componentName}`);
    }
    if (propValue) {
      if (typeof propValue !== "number") {
        return new Error(`Prop ${propName} value on ${componentName} must be a number `);
      }
      if (propValue < min || propValue > max) {
        return new Error(`Prop ${propName} value must be in ${min} and ${max} on ${componentName}`);
      }
    }
  };
};

const Validators = {
  numberBetween,
};

export default Validators;
