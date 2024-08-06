import { useQRCode } from 'next-qrcode';
export default function QRCode({url}) {
  const { SVG } = useQRCode();

  return(
    <SVG
      text={url}
      options={{
        margin: 2,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}