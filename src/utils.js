import axios from "axios";
require("dotenv").config();

export const host = "http://ec2-52-14-255-9.us-east-2.compute.amazonaws.com";
//export const host = "http://localhost:3000";

export async function storeUserAndToken(dispatch) {
  chrome.storage.local.get(["jwtToken"], async (result) => {
    let existingToken = result.jwtToken;
    if (existingToken) {
      try {
        const response = await axios.get(`${host}/api/getuser`, {
          headers: { Authorization: `Bearer ${existingToken}` },
        });
        const user = response.data;
        if (user.new_token) {
          console.log("hey you got a new token ", user.new_token);
          existingToken = user.new_token;
          chrome.storage.local.set({ jwtToken: existingToken });
        }
        dispatch({ type: "SET_JWT_TOKEN", payload: existingToken });
        dispatch({ type: "SET_USER", payload: user });
      } catch (err) {
        dispatch({ type: "SET_JWT_TOKEN", payload: "" });
        chrome.storage.local.set({ jwtToken: "" });
        console.log("The token value is now ", existingToken);
        console.log(err);
      }
    }
  });
}

export function extractHashtags(note) {
  const hashtags = note.content
    .split(/[ \n]+/)
    .filter((word) => word[0] === "#" && word.length > 1 && word[1] !== "#")
    .map((h) => h.toLowerCase());
  return hashtags;
}

export function includesAll(arr1, arr2) {
  let flag = true;
  for (let i = 0; i < arr2.length; i++) {
    if (!arr1.includes(arr2[i])) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function isPasswordValid(password) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const regex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  // if the regex produces any match with the password, return true
  return password.match(regex) !== null;
}

export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
