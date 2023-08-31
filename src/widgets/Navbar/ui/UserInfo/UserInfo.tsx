import { memo, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import { User } from 'entities/User';
import cls from './UserInfo.module.scss';

interface UserInfoProps {
  className?: string;
  authData: User;
}

export const UserInfo = memo((props: UserInfoProps) => {
  const { className, authData } = props;

  const { t } = useTranslation();

  const styles: CSSProperties = {
    width: '250px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'right',
  };

  let fullname = '';

  if (authData.lastname) {
    fullname += authData.lastname;
  }

  if (authData.firstname) {
    fullname += ` ${authData.firstname}`;
  }

  if (authData.middlename) {
    fullname += ` ${authData.middlename}`;
  }

  if (!fullname) {
    fullname = '-';
  }

  return (
    <div className={classNames(cls.UserInfo, {}, [className])}>
      <span style={styles}>{fullname}</span>
      <span style={styles}>{authData.department || '-'}</span>
      <span style={styles}>{authData.jobTitle || authData.position || '-'}</span>
      <span style={styles}>{authData.email || '-'}</span>
    </div>
  );
});
