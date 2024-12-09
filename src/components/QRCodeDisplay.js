import ReactQR from 'react-qr-code';

const QRCodeDisplay = () => {
  const url = `${process.env.REACT_APP_FRONTEND_URL}/menu`;  

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 className='text-slate-500'>QR Code for Menu</h2>
      

      <div className='mt-8 flex justify-center '>
        <ReactQR value={url}  className='size-80 border' />
      </div>
      

      <div className='mt-5 text-slate-500'>
        <p>Scan this QR code to access the menu.</p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
