import QRCode from "qrcode";

const GenerateQRCode = async (url: string) => {
  try {
    const qrImage = await QRCode.toDataURL(url);
    return qrImage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GenerateQRCode;
