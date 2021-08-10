/* eslint-disable jsx-a11y/no-onchange */
import _ from 'lodash';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Clips.module.scss';

const cx = classNames.bind(styles);

export const Clips: React.FC = () => {
  const [enumerateDevices, setEnumerateDevices] = useState({});
  const [videoSource, setVideoSource] = useState();
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { deviceId: videoSource } }).then((stream) => {
      (videoRef.current as HTMLVideoElement).srcObject = stream;
    });
    const enumerateDevices = () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const result = devices.filter((device) => device.kind === 'videoinput');
        return setEnumerateDevices(result);
      });
    };
    enumerateDevices();
  }, [videoSource]);

  const handleSelectChange = (e: any) => {
    setVideoSource(e.target.value);
  };

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
    const stream = videoRef.current?.srcObject as MediaStream & HTMLMediaElement;
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
      <select ref={selectRef} onChange={handleSelectChange}>
        {_.map(enumerateDevices, (deviceId: InputDeviceInfo, idx) => {
          return (
            <option key={idx} value={deviceId.deviceId}>
              {deviceId.label}
            </option>
          );
        })}
      </select>
    </section>
  );
};
