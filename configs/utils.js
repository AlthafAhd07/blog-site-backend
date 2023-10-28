export function getBodyData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        if (body.length > 0) {
          resolve(JSON.parse(body));
        } else {
          resolve({});
        }
      });
    } catch (error) {
      return reject("an error occured");
    }
  });
}

export function SendErrorResponce(res, msg, code = 400) {
  res.writeHead(code, { "Content-type": "application/json" });
  return res.end(JSON.stringify({ msg }));
}

export function getCookieValue(cookies, cookieName) {
  const cookieArray = cookies.split(";"); // Split the cookies string into an array
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.split("=")[1];
    }
  }
  return null;
}
export const AvatarImages = [
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-gcf9196e55_640_1_t7lnt8.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-gab45b8fa4_640_2_khttwi.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-gf747ee52b_640_xqnonp.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-gcf9196e55_640_2_a6vz4o.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-g2600be948_640_t8isz6.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/man-gbd3036a11_640_rr2n3t.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563967/avatar-gab45b8fa4_640_1_n1k8ur.png",
  "https://res.cloudinary.com/davg6e0yh/image/upload/v1668563968/businessman-g7205c9a96_640_jhplmn.png",
];
