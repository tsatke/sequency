import QRCode from 'react-google-qrcode';

const qr = ({ data }) => {
    return (
        <div>
            <QRCode
                data={data}
                size={130}
                framed
            />
        </div>
    );
}

export default qr