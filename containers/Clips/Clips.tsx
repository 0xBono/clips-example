import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Clips.module.scss';

const cx = classNames.bind(styles);

export const Clips: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      (videoRef.current as HTMLVideoElement).srcObject = stream;
    });
  }, []);

  const availableDevices = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      return devices
        .filter((device) => device.kind === 'videoinput')
        .forEach((device) => {
          console.log(device);
        });
    });
  };

  const off = () => {
    const stream = (videoRef.current as HTMLVideoElement).srcObject as any;
    stream.getVideoTracks().forEach((track: any) => {
      track.stop();
      stream.srcObject = null;
    });
  };

  const on = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      (videoRef.current as HTMLVideoElement).srcObject = stream;
    });
  };

  return (
    <section className={cx('wrap')}>
      <video ref={videoRef} className={cx('webcam')} autoPlay playsInline muted />
      <button className={cx('button')} onClick={off}>
        OFF 버튼임!
      </button>
      <button className={cx('button')} onClick={on}>
        ON 버튼임!
      </button>
    </section>
  );
};
