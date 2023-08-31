import {
  memo, MutableRefObject, ReactNode, useRef
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const {
    className,
    children,
    onScrollEnd,
  } = props;

  const dispatch = useAppDispatch();

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    wrapperRef,
  });

  return (
    <section
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
      // onScroll={onScroll}
    >
      {children}

      { onScrollEnd ? (
        <div
          className={cls.trigger}
          ref={triggerRef}
        />
      ) : null}

    </section>
  );
});
