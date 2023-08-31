import { CSSProperties, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

const DEFAULT_SIZE = 50;

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size,
  } = props;

  const styles = useMemo<CSSProperties>(() => ({
    width: size || DEFAULT_SIZE,
    height: size || DEFAULT_SIZE,
  }), [size]);

  return (
    <img
      className={classNames(cls.Avatar, {}, [className])}
      style={styles}
      src={src}
      alt={alt}
    />

  );
};
