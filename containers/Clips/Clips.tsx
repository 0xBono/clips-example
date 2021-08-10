import { useEffect, useRef } from 'react';
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

  /**
   * @description 카메라 온/오프 과정에서 필요로 하는 MediaTracks 생성하는 함수
   */
  const startMediaTracks = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      (videoRef.current as HTMLVideoElement).srcObject = stream;
    });
  };

  /**
   * @description 카메라 온/오프 과정에서 생기는 MediaTracks 제거하는 함수
   */
  const stopMediaTracks = () => {
    const stream = (videoRef.current as HTMLVideoElement).srcObject as any;
    stream.getVideoTracks().forEach((track: any) => {
      track.stop();
      stream.srcObject = null;
    });
  };

  return (
    <section className={cx('wrap')}>
      <video ref={videoRef} className={cx('webcam')} autoPlay playsInline muted />
      <button className={cx('button')} onClick={stopMediaTracks}>
        OFF
      </button>
      <button className={cx('button')} onClick={startMediaTracks}>
        ON
      </button>
    </section>
  );
};
