export const validRegister = (username, email, password) => {
  const errors = [];
  if (!username) {
    errors.push("Please add your name.");
  } else if (username.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }
  if (!email) {
    errors.push("Please add your email.");
  } else if (!validateEmail(email)) {
    errors.push("Enter a valid email");
  }
  if (password.length < 6) {
    errors.push("Password must be at least 6 character");
  }
  return errors;
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
