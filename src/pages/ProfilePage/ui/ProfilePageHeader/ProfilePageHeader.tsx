import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEditProfile());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />

      {canEdit && (
        <div className={cls.btnsWrapper}>
          {
            readonly ? (
              <Button
                className={cls.editBtn}
                variant={ButtonVariant.OUTLINE}
                onClick={onEdit}
              >
                {t('edit')}
              </Button>
            ) : (
              <>
                <Button
                  className={cls.saveBtn}
                  variant={ButtonVariant.OUTLINE}
                  onClick={onSaveEdit}
                >
                  {t('save')}
                </Button>
                <Button
                  className={cls.cancelBtn}
                  variant={ButtonVariant.OUTLINE_RED}
                  onClick={onCancelEdit}
                >
                  {t('cancel')}
                </Button>
              </>
            )
          }
        </div>
      )}
    </div>
  );
};
