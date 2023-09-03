import { nanoid } from "nanoid"

/**
 * @description Generate a unique id
 * @returns
 */
export const uuid = (): string => {
  return nanoid();
}

/**
 * @desdescription Generate a random code
 * @returns
 */
export const generateRandomCode = () => {
  return Math.floor(Math.random() * 9000) + 1000;
}
