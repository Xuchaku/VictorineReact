import fs from "fs";
import MatchesResponse from "../types/MatchesResponse";
function decodeBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response: MatchesResponse = {
    type: "",
    data: null,
  };

  if (matches) {
    response.type = matches[1];
    response.data = Buffer.from(matches[2], "base64");
  }
  console.log(response.type);
  return response;
}
function base64ImgSave(data: string, fileName: string) {
  try {
    const response = decodeBase64Image(data);
    if (response.data) {
      const out = fs.writeFileSync(
        __dirname + `/../public/avatars/${fileName}.jpg`,
        response.data,
        { flag: "a" }
      );
    }
  } catch (err) {}
}
export default base64ImgSave;
