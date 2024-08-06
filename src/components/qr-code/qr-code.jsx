import { useQRCode } from 'next-qrcode';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('next-qrcode').then(mod => mod.useQRCode), { ssr: false });

export default function QRCodeComponent({url}) {
    const { Canvas } = useQRCode();
    return (
      <Canvas
        text={url}
        options={{
          errorCorrectionLevel: 'L',
          margin: 2,
          scale: 5,
          width: 150,
          color: {
            dark: '#010599FF',
            light: '#FFBF60FF',
          },
        }}
        logo={{
          src: 'https://next-qrcode.js.org/github.png',
          options: {
            width: 35,
            x: undefined,
            y: undefined,
          }
        }}
      />
    );
}