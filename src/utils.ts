export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

/**
 * When used inside an async function, this function will
 * pause execution for the specified time in seconds.
 * @param {number} seconds 
 * @example
 * async function slowShow(string) {
 *   for(let char of string) {
 *     console.log(char)
 *     await waitForSeconds(1);
 *   }
 * }
 * slowShow('foo') // f ... (1 second) o ... (1 second) ... o ... (1 second)
 */
export const waitForSeconds = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
