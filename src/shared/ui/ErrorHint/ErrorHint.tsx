import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import ErrorIcon from 'shared/assets/icons/hint-error.svg';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

import cls from './ErrorHint.module.scss';

interface ErrorHintProps {
  className?: string;
  text?: string;
}

export const ErrorHint = memo((props: ErrorHintProps) => {
  const { className, text } = props;

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ErrorHint, {}, [className])}>
      <Icon Svg={ErrorIcon} />
      <Text
        text={
          text ||
          'Оставьте комментарий в тексте задания, прежде чем отправить документ на доработку.'
        }
      />
    </div>
  );
});
