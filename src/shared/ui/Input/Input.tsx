import React, {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  autofocus?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

const CARET_OFFSET = 9;

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    type = 'text',
    placeholder = '',
    autoFocus = false,
    readonly,
    onChange,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    // setCaretPosition(e.target.value.length);
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}

      <div className={cls.caretWrapper}>

        <input
          ref={inputRef}
          type={type}
          className={cls.input}
          value={value}
          readOnly={readonly}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChangeHandler}
          onSelect={onSelect}
          {...otherProps}
        />

        {isCaretVisible && (
          <span
            className={cls.caret}
            style={{ left: caretPosition * CARET_OFFSET }}
          />
        )}

      </div>
    </div>
  );
});
