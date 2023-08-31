import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import { getUserOrganization } from 'entities/User/model/selectors/getUserOrganization/getUserOrganization';
import { useSelector } from 'react-redux';
import cls from './OrganizationInfo.module.scss';

interface OrganizationInfoProps {
  className?: string;
}

// const ORGANIZATION_NAME = 'Общество с ограниченной ответственностью "Парусник-Белгород"';

export const OrganizationInfo = memo((props: OrganizationInfoProps) => {
  const { className } = props;

  const { t } = useTranslation();

  const organization = useSelector(getUserOrganization);

  return (
    <div className={classNames(cls.OrganizationInfo, {}, [className])}>
      <span>{organization}</span>
    </div>
  );
});
