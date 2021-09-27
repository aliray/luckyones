import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '柚联集团deFi科技出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Luckyones',
          title: <><span>&#127942;Luckyones</span></>,
          href: 'https://pemelo.finace',
          blankTarget: true,
        },
      ]}
    />
  );
};
