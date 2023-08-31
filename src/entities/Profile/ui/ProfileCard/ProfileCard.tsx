import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextVariant } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/ProfileSchema';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
  } = props;

  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          variant={TextVariant.ERROR}
          title={t('error')}
          text={t('reload-page')}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>

      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <Avatar
            src={data?.avatar}
            alt="avatar"
          />
        </div>
      )}

      <Input
        className={cls.input}
        value={data?.firstname}
        placeholder={t('firstname')}
        readonly={readonly}
        onChange={onChangeFirstname}
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('lastname')}
        readonly={readonly}
        onChange={onChangeLastname}
      />
      <Input
        className={cls.input}
        value={data?.age}
        placeholder={t('age')}
        readonly={readonly}
        onChange={onChangeAge}
      />
      <Input
        className={cls.input}
        value={data?.city}
        placeholder={t('city')}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <Input
        className={cls.input}
        value={data?.username}
        placeholder={t('username')}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <Input
        className={cls.input}
        value={data?.avatar}
        placeholder={t('avatar')}
        readonly={readonly}
        onChange={onChangeAvatar}
      />
    </div>
  );
};
